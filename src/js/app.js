const inputFromAddressName = '#js-from-address'
const inputToAddressName = '#js-to-address'
const inputRecipientName = '#js-recipient-address'
const descFromName = '#js-description-from'
const descToName = '#js-description-to'
const btnCopyName = '#js-btn-copy'

$(inputFromAddressName).focus()

const handleAddressChange = () => {
  try {
    const fromAddress = $(inputFromAddressName).val()
    const toAddress = $(inputToAddressName).val()
    const recipientAddress = window.atduck.utils.getRecipientAddress(fromAddress, toAddress)

    $(inputRecipientName).val(recipientAddress)
    $(inputRecipientName).removeClass('error')
    $(descFromName).html(fromAddress)
    $(descToName).html(toAddress)
  } catch (error) {
    $(inputRecipientName).val(error.message)
    $(inputRecipientName).addClass('error')
  }
}

$(inputFromAddressName).on('keyup', handleAddressChange)
$(inputToAddressName).on('keyup', handleAddressChange)

$(btnCopyName).on('click', () => {
  const email = $(inputRecipientName).val()
  window.atduck.utils.copyToClipboard(email)

  $(inputRecipientName).val('Copied to clipboard')
  $(inputRecipientName).addClass('copied')

  setTimeout(() => {
    $(inputRecipientName).val(email)
    $(inputRecipientName).removeClass('copied')
  }, 1000)
})
