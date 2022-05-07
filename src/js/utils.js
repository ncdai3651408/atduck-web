;(function (window) {
  window.atduck = window.atduck || {}

  window.atduck.utils = {
    isValidEmail: (text) => {
      const emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
      if (!emailPattern.test(text)) {
        return false
      }
      return true
    },

    isDuckAddress: (email) => {
      const duckEmailPattern = /^\b[A-Z0-9._%-]+@duck.com/i
      if (!duckEmailPattern.test(email)) {
        return false
      }
      return true
    },

    getRecipientAddress: function (fromAddress, toAddress) {
      if (!this.isDuckAddress(fromAddress)) {
        throw new Error('From must be Duck Address (name@duck.com)')
      }

      if (!this.isValidEmail(toAddress)) {
        throw new Error('To is not valid')
      }

      return `${toAddress.replace('@', '_at_')}_${fromAddress}`
    },

    copyToClipboard: (text) => {
      const $input = $('<input>')
      $('body').append($input)
      $input.val(text).select()
      document.execCommand('copy')
      $input.remove()
    }
  }
})(window)
