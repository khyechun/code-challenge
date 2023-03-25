import { useEffect, useRef, useState } from 'react'
import ethereum_address from 'ethereum-address'
import OTPModal from './OTPModal'


const dummyWalletAmount = 8422.30
const dummyConversion = 1 / 1745.63

export default function Form() {
  const ethAddress = useRef()
  const amountToSend = useRef()
  const [amount, setAmount] = useState(0)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({ ethErr: '', amountErr: '' })

  useEffect(() => {
    if (ethAddress == null) return
    ethAddress.current.style.width = "600px"
    ethAddress.current.focus()
  }, [ethAddress.current])

  useEffect(() => {
    document.getElementById('otp-modal').addEventListener('shown.bs.modal', function () {
      document.getElementById('otp-input-0').focus()
    })
  }, [])

  useEffect(() => {
    if (step == 1) {
      amountToSend.current.disabled = false;
      ethAddress.current.disabled = false;
    }
  }, [step])

  const handleEnterClick = (event) => {
    if (event.keyCode == 13) {
      handleNext()
    }
  }

  const handleNext = () => {

    setErrors({ ethErr: '', amountErr: '' })
    if (!util.validation.validateEthAddress(setErrors, ethAddress.current.value)) {
      return
    }
    if (step == 2) {
      if (!util.validation.validateAmount(setErrors, amountToSend.current.value)) {
        return
      }
      const toastEl = document.getElementById('toast')
      toastEl.classList.remove('toast-start')
      toastEl.classList.remove('toast-finish')
      void toastEl.offsetWidth
      toastEl.classList.add('toast-start')
      setTimeout(() => {
        if (util.validation.validateAmountBalance(setErrors, amountToSend.current.value)) {
          document.getElementById('otp-modal-btn').click()
        }
        toastEl.classList.remove('toast-finish')
        void toastEl.offsetWidth
        toastEl.classList.add('toast-finish')
      }, 2000);
    }

    if (step == 1) {
      document.getElementById('form-input-container-1').style.marginTop = 0;
      document.getElementById('form-input-container-2').style.opacity = 1;
      amountToSend.current.style.width = "600px"
      setTimeout(() => {
        amountToSend.current.focus()
        amountToSend.current.select()
      }, 100);
      setStep(2)
    } else if (step == 2) {
      const test = parseFloat(amount).toFixed(2)
      setAmount(test)
    }

  }

  const handleAmountChange = (event) => {
    const val = event.target.value
    if (isNaN(val)) return
    setAmount(val)
  }

  const resetTransaction = () => {
    setStep(1)
    ethAddress.current.value = ''
    setAmount(0)
    document.getElementById('form-input-container-1').style.marginTop = "50px";
    document.getElementById('form-input-container-2').style.opacity = 0;
  }

  return (
    <>
      <div id="container">
        <div id="form-input-container-1" className="form-input-container">
          <p className="header">ETH Address</p>
          <input onKeyUp={handleEnterClick} ref={ethAddress} className="default" placeholder="Enter ETH Address here..." /> <br />
          <p id="input-error-1" className="input-error">{errors.ethErr}</p>
          {step == 1 && <><button style={{ alignSelf: "start", marginTop: "20px" }} type="button" onClick={handleNext}>Next</button> <small style={{ marginLeft: "10px" }}>Press Enter &#9166;</small></>}
        </div>
        <div id="form-input-container-2" className="form-input-container">
          <p className="header">Amount to send</p>
          <span style={{ width: "35px", display: "inline-block" }}>USD</span>
          <input id="input-money" onKeyUp={handleEnterClick} onChange={handleAmountChange} placeholder="Enter amount to send here..." ref={amountToSend} className="default" value={amount} /> <br />

          <div className="d-flex flex-row align-items-start">
            <span class="material-symbols-outlined me-1">
              swap_horiz
            </span>
            <span >ETH: {amount * dummyConversion}</span>
          </div>
          <p id="input-error-2" className="input-error">{errors.amountErr}</p>

          {step == 2 && <><button style={{ alignSelf: "start", marginTop: "20px" }} type="button" onClick={handleNext}>Send Tokens</button> <small style={{ marginLeft: "10px" }}>Press Enter &#9166;</small></>}
          {step == 3 && <><span className='text-success mt-4'>Transaction Successful!</span> <span type="button" onClick={resetTransaction}><u>Make another</u></span></>}
        </div>
      </div>
      <Toast />
      <OTPModal step={step} setStep={setStep} amountToSend={amountToSend} ethAddress={ethAddress} />
    </>
  );
}

function Toast() {
  return <div className="custom-toast" id="toast">
    <span className="loader" style={{ marginRight: "10px" }} />Processing ...
  </div>
}

const util = {
  validation: {
    validateAmountBalance: (setErrors, val) => {
      if (val > dummyWalletAmount) {
        const inputErrEl = document.getElementById('input-error-2')
        inputErrEl.classList.remove('shake-animation')
        void inputErrEl.offsetWidth
        inputErrEl.classList.add('shake-animation')
        setErrors((errors) => {
          return { ...errors, amountErr: 'Out of balance' }
        })
        return false
      }
      return true
    },
    validateAmount: (setErrors, val) => {
      if (val <= 0 || val.trim() == '') {
        const inputErrEl = document.getElementById('input-error-2')
        inputErrEl.classList.remove('shake-animation')
        void inputErrEl.offsetWidth
        inputErrEl.classList.add('shake-animation')
        setErrors((errors) => {
          return { ...errors, amountErr: 'Please enter an amount higher than 0' }
        })
        return false
      }
      return true
    },
    validateEthAddress: (setErrors, val) => {
      if (!ethereum_address.isAddress(val)) {
        const inputErrEl = document.getElementById('input-error-1')
        inputErrEl.classList.remove('shake-animation')
        void inputErrEl.offsetWidth
        inputErrEl.classList.add('shake-animation')
        setErrors((errors) => {
          return { ...errors, ethErr: 'Invalid ETH Address' }
        })
        return false
      }
      return true
    }
  }
}
