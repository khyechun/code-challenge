import { useState, useEffect } from "react"

export default function OTPModal({ step, setStep, amountToSend, ethAddress }) {
  const [otp, setOTP] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (otp.every(item => item.length > 0)) {
      setIsLoading(true)
      setTimeout(() => {
        document.getElementById('close-otp-modal-btn').click()
        setStep(3)
        amountToSend.current.disabled = true;
        ethAddress.current.disabled = true;
      }, 1500);
    }
  }, [otp])

  useEffect(() => {
    if (step == 1) {
      setOTP(['', '', '', '', '', ''])
      setIsLoading(false)
    }
  }, [step])

  const handleOTPInputChange = (event, index) => {
    event.preventDefault()
    if (event.target.value.length == 1) {
      setOTP(otp => {
        const copy = [...otp]
        copy[index] = event.target.value
        return copy
      })
      if (index + 1 < otp.length) {
        document.getElementById(`otp-input-${index + 1}`).select()
      }
    }
  }

  const handleBackspaceOtp = (event, index) => {
    if (event.keyCode == '8') {
      setOTP(otp => {
        const copy = [...otp]
        copy[index] = ''
        return copy
      })
      if (index != 0) {
        document.getElementById(`otp-input-${index - 1}`).select()
      }
    }
  }

  const handlePasteEvent = (event, index) => {
    const clipboardData = event.clipboardData;
    const val = clipboardData.getData('Text')
    let valIndex = 0
    const otpCopy = [...otp]
    while (valIndex < val.length) {
      otpCopy[index] = val[valIndex++]
      index++
      if (index >= otp.length) {
        break
      }
    }
    if (index >= otp.length) {
      document.getElementById(`otp-input-5`).select()
    } else {
      document.getElementById(`otp-input-${index}`).select()
    }
    setOTP(otpCopy)
  }

  return <>
    <button id="otp-modal-btn" className="d-none" data-bs-toggle="modal" data-bs-target="#otp-modal" />
    <div class="modal fade" id="otp-modal" tabindex="-1" aria-labelledby="otpModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h1 class="modal-title fs-5">Enter OTP</h1>
            <button id="close-otp-modal-btn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Enter the 6 digit code sent to your number</p>
            <div class="d-flex justify-content-center">
              {otp.map((item, index) => {
                return <input id={`otp-input-${index}`} value={item} onKeyUp={(event) => handleBackspaceOtp(event, index)} onPaste={(event) => handlePasteEvent(event, index)} onChange={(event) => handleOTPInputChange(event, index)} class="otp-input" />
              })}
            </div>
            {isLoading && <div className='d-flex justify-content-center pt-3'>
              <span className='loader' style={{ width: "40px", height: "40px" }} />
            </div>}
          </div>
        </div>
      </div>
    </div>
  </>
}