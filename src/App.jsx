import { useState, useCallback } from 'react'
import LandingStep from './components/LandingStep'
import DemographicsStep from './components/DemographicsStep'
import MoodboardStep from './components/MoodboardStep'
import FeedbackStep from './components/FeedbackStep'
import ThankYouStep from './components/ThankYouStep'
import ProgressBar from './components/ProgressBar'
import Toast from './components/Toast'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxjbK-rdBk6DaTOD-_gflORg0GBR_ZizdYF3Yjxnt7cxyITrJaZ41we8OFUOZVgNgzr/exec'

const MOODBOARD_IMAGES = [
  '/images/Phase1_P8_Pakhi_Moodboard_PS-E.jpg',
  '/images/Phase1_P8_Pakhi_Moodboard_PS-F.jpg',
  '/images/Phase1_P8_Pakhi_Moodboard_PS-M.jpg',
]

const KEYWORDS = [
  'Comforting', 'Bold', 'Feel-Good', 'Confidence',
  'Pleasing', 'Quiet', 'Moody', 'Dynamic',
  'Safe', 'Passionate', 'Humble', 'Classic',
  'Elite', 'Timeless',
]

const TOTAL_STEPS = 6 // 0=landing, 1=demo, 2-4=moodboards, 5=feedback, 6=thankyou

export default function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })
  const [submitting, setSubmitting] = useState(false)

  const [responses, setResponses] = useState({
    gender: '',
    age: '',
    mood1: [],
    mood2: [],
    mood3: [],
    feedback: '',
  })

  const showToast = useCallback((message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }, [])

  const updateResponse = useCallback((key, value) => {
    setResponses(prev => ({ ...prev, [key]: value }))
  }, [])

  const toggleKeyword = useCallback((key, word) => {
    setResponses(prev => {
      const current = prev[key]
      if (current.includes(word)) {
        return { ...prev, [key]: current.filter(w => w !== word) }
      } else {
        return { ...prev, [key]: [...current, word] }
      }
    })
  }, [])

  const goToStep = useCallback((step) => {
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep(step)
      setAnimating(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }, [])

  const nextStep = useCallback(() => {
    // Validation
    if (currentStep === 1 && (!responses.gender || !responses.age)) {
      showToast('Please select both gender and age group')
      return
    }
    if (currentStep === 2 && responses.mood1.length === 0) {
      showToast('Please select at least one word for this moodboard')
      return
    }
    if (currentStep === 3 && responses.mood2.length === 0) {
      showToast('Please select at least one word for this moodboard')
      return
    }
    if (currentStep === 4 && responses.mood3.length === 0) {
      showToast('Please select at least one word for this moodboard')
      return
    }
    goToStep(currentStep + 1)
  }, [currentStep, responses, goToStep, showToast])

  const prevStep = useCallback(() => {
    goToStep(currentStep - 1)
  }, [currentStep, goToStep])

  const submitSurvey = useCallback(async () => {
    setSubmitting(true)

    const payload = {
      timestamp: new Date().toISOString(),
      gender: responses.gender,
      ageGroup: responses.age,
      moodboard1: responses.mood1.join(', '),
      moodboard2: responses.mood2.join(', '),
      moodboard3: responses.mood3.join(', '),
      feedback: responses.feedback.trim(),
    }

    console.log('=== SURVEY SUBMISSION START ===')
    console.log('Payload:', JSON.stringify(payload, null, 2))

    try {
      if (GOOGLE_SCRIPT_URL) {
        const params = new URLSearchParams(payload)
        const fullUrl = `${GOOGLE_SCRIPT_URL}?${params.toString()}`
        console.log('Submitting via iframe GET:', fullUrl)

        // Load the GET URL in a hidden iframe — browser handles redirects naturally
        await new Promise((resolve) => {
          const iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          document.body.appendChild(iframe)

          iframe.onload = () => {
            console.log('✅ Iframe loaded — data sent successfully')
            setTimeout(() => document.body.removeChild(iframe), 500)
            resolve()
          }

          iframe.onerror = () => {
            console.log('Iframe error (data may still have been sent)')
            setTimeout(() => document.body.removeChild(iframe), 500)
            resolve()
          }

          // Timeout fallback
          setTimeout(() => {
            console.log('Timeout reached — proceeding')
            resolve()
          }, 6000)

          iframe.src = fullUrl
        })

        console.log('=== SURVEY SUBMISSION COMPLETE ===')
      } else {
        console.log('No GOOGLE_SCRIPT_URL set, logging only')
        console.log('Survey Response:', payload)
      }
      goToStep(TOTAL_STEPS)
    } catch (err) {
      console.error('Submission error:', err)
      showToast('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [responses, goToStep, showToast])

  const progressPercent = currentStep === 0 ? 0 : (currentStep / TOTAL_STEPS) * 100

  const canProceedStep1 = responses.gender && responses.age
  const canProceedStep2 = responses.mood1.length > 0
  const canProceedStep3 = responses.mood2.length > 0
  const canProceedStep4 = responses.mood3.length > 0

  return (
    <>
      <ProgressBar percent={progressPercent} visible={currentStep > 0 && currentStep < TOTAL_STEPS} />

      <div className="survey-container">
        {currentStep === 0 && (
          <div className="step step-enter" key="step-0">
            <LandingStep onStart={nextStep} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="step step-enter" key="step-1">
            <DemographicsStep
              gender={responses.gender}
              age={responses.age}
              onSelectGender={(v) => updateResponse('gender', v)}
              onSelectAge={(v) => updateResponse('age', v)}
              onNext={nextStep}
              onBack={prevStep}
              canProceed={canProceedStep1}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="step step-enter" key="step-2">
            <MoodboardStep
              stepNumber={2}
              totalSteps={5}
              moodboardNumber={1}
              imageSrc={MOODBOARD_IMAGES[0]}
              keywords={KEYWORDS}
              selected={responses.mood1}
              onSelect={(v) => toggleKeyword('mood1', v)}
              onNext={nextStep}
              onBack={prevStep}
              canProceed={canProceedStep2}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="step step-enter" key="step-3">
            <MoodboardStep
              stepNumber={3}
              totalSteps={5}
              moodboardNumber={2}
              imageSrc={MOODBOARD_IMAGES[1]}
              keywords={KEYWORDS}
              selected={responses.mood2}
              onSelect={(v) => toggleKeyword('mood2', v)}
              onNext={nextStep}
              onBack={prevStep}
              canProceed={canProceedStep3}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="step step-enter" key="step-4">
            <MoodboardStep
              stepNumber={4}
              totalSteps={5}
              moodboardNumber={3}
              imageSrc={MOODBOARD_IMAGES[2]}
              keywords={KEYWORDS}
              selected={responses.mood3}
              onSelect={(v) => toggleKeyword('mood3', v)}
              onNext={nextStep}
              onBack={prevStep}
              canProceed={canProceedStep4}
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="step step-enter" key="step-5">
            <FeedbackStep
              value={responses.feedback}
              onChange={(v) => updateResponse('feedback', v)}
              onSubmit={submitSurvey}
              onBack={prevStep}
              submitting={submitting}
            />
          </div>
        )}

        {currentStep === 6 && (
          <div className="step step-enter" key="step-6">
            <ThankYouStep />
          </div>
        )}
      </div>

      <Toast show={toast.show} message={toast.message} />
    </>
  )
}
