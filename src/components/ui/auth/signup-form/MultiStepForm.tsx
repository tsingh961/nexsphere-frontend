import React from 'react'
import AuthForm from './multi-step-form/AuthForm'

function MultiStepForm() {
  return (
    <div className="min-h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl backdrop-filter rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden">
            <AuthForm />
        </div>
    </div>
  )
}

export default MultiStepForm