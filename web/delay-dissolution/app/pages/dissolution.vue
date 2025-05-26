<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonControl from '~/components/Connect/ButtonControl.vue'

const feeStore = useConnectFeeStore()

// company info
const companyName = 'COMPANY NAME 12345'
const companyType = 'BC Benefit Company'
const businessNumber = 'Not Available'
const incorporationNumber = 'BC0012345'
const companyEmail = 'abc@email.com'
const companyPhoneNumber = '(604) 123-4567'

// delay length
const options = [
  { value: '6', label: '6 Months' },
  { value: '12', label: '1 Year' },
  { value: '24', label: '2 Years' },
  { value: 'custom', label: 'Select a date' }
]
const selected = ref('6') // default: 6 months from radio
const customMonths = ref<number | null>(null) // from input box

const formattedDate = computed(() => {
  const months = selected.value === 'custom' ? customMonths.value : Number(selected.value)
  if (!months || isNaN(months)) {
    return ''
  }

  const currentDate = new Date()
  const futureDate = new Date(currentDate)
  futureDate.setMonth(futureDate.getMonth() + months)

  return futureDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// submit and cancel button settings
definePageMeta({
  buttonControl: {
    leftButtons: [
      {
        label: 'Save',
        variant: 'outline',
        click: () => alert('save clicked!')
      },
      {
        label: 'Save and Resume Later',
        variant: 'outline',
        click: () => alert('save and resume later clicked!')
      }
    ],
    rightButtons: [
      {
        label: 'Cancel',
        variant: 'outline',
        onClick: () => alert('cancel clicked!')
      },
      {
        label: 'File Now (No Fee)',
        variant: 'solid',
        onClick: () => alert('Submit clicked!')
      }
    ]
  }
})

// text area character counter
const message = ref('')
const maxLength = 2000
const characterCount = computed(() => message.value.length)

const message2 = ref('')
const characterCount2 = computed(() => message2.value.length)

// TODO: get fee from pay api?
// set empty fee
feeStore.feeOptions.showServiceFees = false
feeStore.fees = {
  DELAY_DISSOLUTION: {
    filingFees: 0,
    filingType: 'Delay of Dissolution Fee',
    filingTypeCode: 'OFFICER_CHANGE', // needs update
    futureEffectiveFees: 0,
    priorityFees: 0,
    processingFees: 0,
    serviceFees: 0,
    tax: {
      gst: 0,
      pst: 0
    },
    total: 0,
    waived: true
  }
}
</script>

<template>
  <div>
    <!-- Company info -->
    <div class="company-info-top">
      <div class="left-info">
        <h1>{{ companyName }}</h1>
        <p>{{ companyType }}</p>
        <br><br>
        <div class="comments-info">
          <svg
            class="comments-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          ><path fill="#1669BB" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12zM6 7h12v2H6zm0 4h9v2H6z" /></svg>
          <p class="comments">
            0 Comments
          </p>
        </div>
      </div>
      <div class="right-info">
        <p><b>Business Number:</b> {{ businessNumber }}</p>
        <p><b>Incorporation Number:</b> {{ incorporationNumber }}</p>
        <p><b>Email:</b> {{ companyEmail }}</p>
        <p><b>Phone:</b> {{ companyPhoneNumber }}</p>
      </div>
    </div>
    <div class="body">
      <div>
        <!-- Info -->
        <div class="py-10 space-y-10">
          <h1>Delay of Dissolution or Cancellation</h1>
          <p>
            The dissolution or cancellation of this business will be delayed until <b>{{ formattedDate }}</b>,
            which is {{ selected === 'custom' ? `${customMonths ?? ''}` : selected }} months from today.
            <br>
            <b>Note:</b> This business is not eligible to request for another delay.
          </p>
          <!-- Delay for -->
          <h2>
            1. Delay the Time of Dissolution or Cancellation
          </h2>
          <p>Select how long the dissolution or cancellation will be delayed for.</p>
          <div class="card">
            <div class="form-row">
              <div class="form-label">
                <h3>Delay For</h3>
              </div>
              <div class="form-controls">
                <div class="option" v-for="option in options" :key="option.value">
                  <input
                    type="radio"
                    :id="option.value"
                    name="delay"
                    :value="option.value"
                    v-model="selected"
                  >
                  <label :for="option.value">{{ option.label }}</label>
                </div>

                <div class="input-box">
                  <UInput
                    v-model.number="customMonths"
                    type="number"
                    min="1"
                    placeholder="Date"
                  />
                  <span class="date-note">Maximum of 200 per day</span>
                </div>

                <div class="result">
                  The dissolution or cancellation of this business will be delayed until
                  <strong>{{ formattedDate }}</strong>.
                </div>
              </div>
            </div>
          </div>
          <!-- Ledger Detail -->
          <h2>2. Ledger Detail</h2>
          <p>Enter a detail that will appear on the ledger for this business.</p>
          <div class="card">
            <div class="form-row">
              <div class="form-label">
                <h3>Detail</h3>
              </div>
              <div class="form-controls">
                <div class="input-box">
                  <UTextarea
                    v-model="message"
                    :ui="{ base: 'resize-none' }"
                    :maxlength="maxLength"
                    size="xl"
                    :rows="6"
                    placeholder="Detail to appear on the ledger"
                  />
                  <p class="text-right text-sm text-bcGovMidGray mt-1">
                    {{ characterCount }} / {{ maxLength }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Documents Delivery -->
          <h2>3. Documents Delivery</h2>
          <p>Copies of the continuation out documents will be sent to the email addresses listed below.</p>
          <div class="card">
            <div class="form-row">
              <div class="form-label">
                <h3>Business Office</h3>
                <br>
                <h3>Completing Party</h3>
              </div>
              <div class="form-controls">
                <p>BO@email.com</p>
                <br>
                <div class="input-box">
                  <UInput placeholder="Client Email Address (Optional)" />
                </div>
              </div>
            </div>
          </div>
          <!-- Certify -->
          <h2>4. Certify</h2>
          <p>Confirm the legal name of the person authorized to complete and submit this filing.</p>
          <div class="card">
            <div class="form-row">
              <div class="form-label">
                <h3>Legal Name</h3>
              </div>
              <div class="form-controls">
                <div class="input-box">
                  <UInput placeholder="Your Name" />
                </div>
                <div class="check-box">
                  <UCheckbox />
                  <p class="check-label">
                    <b>[Legal Name]</b> certifies that they have relevant knowledge of the business and is authorized to make this filing.<br><br>
                    <b>Date:</b> July 10, 2024<br><br>
                    Note: It is an offence to make or assist in making a false or misleading statement in a record filed under the Business Corporations Act. A person who commits this offence is subject to a maximum fine of $5,000.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Folio / Reference number -->
          <h2>5. Folio / Reference Number (Optional)</h2>
          <p>Add an optional Folio or Reference Number about this business for your own tracking purposes. This information is not used by the BC Business Registry.</p>
          <div class="card">
            <div class="form-row">
              <div class="form-label">
                <h3>Folio Number</h3>
              </div>
              <div class="form-controls">
                <div class="input-box">
                  <UInput placeholder="Folio or Reference Number (Optional)" maxlength="5000px" />
                </div>
              </div>
            </div>
          </div>
          <!-- Court Order -->
           <h2>6. Court Order (Optional)</h2>
          <p>Add an optional court order Reference Number, date and description.</p>
          <div class="card">
            <div class="form-row">
              <div class="form-label">
                <h3>File Number</h3>
                <br><br>
                <h3>Order Date</h3>
                <br><br>
                <h3>Details</h3>
              </div>
              <div class="form-controls">
                <div class="input-box">
                  <UInput placeholder="Reference Number" maxlength="5000px" />
                  <br>
                  <UInput placeholder="Date" maxlength="5000px" />
                  <br>
                  <UTextarea
                    v-model="message2"
                    :ui="{ base: 'resize-none' }"
                    :maxlength="maxLength"
                    size="xl"
                    :rows="6"
                    placeholder="Details"
                  />
                  <p class="text-right text-sm text-bcGovMidGray mt-1">
                    {{ characterCount2 }} / {{ maxLength }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fee-box">
        <ConnectFeeWidget class="lg:top-10" />
      </div>
    </div>
    <div class="foot">
      <ButtonControl />
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 0px;
  margin-top: 48px;
}

.company-info-top {
  background: #FFFFFF;
  width: 100%;
  height: 216px;
  padding-top: 40px;
  padding-right: 32px;
  padding-bottom: 40px;
  padding-left: 52px;
  display: flex;
}

.left-info {
  width: 950px;
}

.comments-info {
  display: flex;
  -webkit-text-fill-color: #1669BB;
}

.right-info {
  flex: 1;
}

.body {
  display: flex;
}

.fee-box {
  padding-top: 48px;
}

.card {
  background: #FFFFFF;
  padding-top: 40px;
  padding-right: 32px;
  padding-bottom: 40px;
  padding-left: 32px;
  gap: 32px;
  border-radius: 4px;
  width: fill;
  height: auto;
  margin: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.form-row {
  display: flex;
  gap: 32px;
}

.form-label {
  width: 150px;
  font-weight: bold;
}

.form-controls {
  flex: 1;
}

.option {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.option input {
  margin-right: 8px;
}

.input-box {
  margin: 12px 0;
  display: flex;
  flex-direction: column;
}

.date-note {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.result {
  margin-top: 20px;
  font-size: 14px;
}

.check-box {
  display: flex;
}

.check-label {
  padding-left: 13px;
  font: BC sans;
  font-size: 14px;
  -webkit-text-fill-color: #495057;
}

.comments-icon {
  padding-top: 3px;
}
.comments {
  padding-left: 5px;
}

.foot {
  width: 100%;
}
</style>
