'use client'

import { useEffect } from 'react'

function getAuthenticatedCustomer() {
  try {
    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) return null
    return JSON.parse(stored) as {
      customer_id: string
      first_name: string
      last_name: string
      email: string
    }
  } catch {
    return null
  }
}

export default function TalkdeskChat() {
  useEffect(() => {
    if (document.getElementById('tdwebchatscript')) return

    const divContainer = document.createElement('div')
    divContainer.id = 'tdWebchat'
    document.body.appendChild(divContainer)

    const script = document.createElement('script')
    const firstScriptTag = document.getElementsByTagName('script')[0]
    script.type = 'text/javascript'
    script.charset = 'UTF-8'
    script.id = 'tdwebchatscript'
    script.src = 'https://talkdeskchatsdk.talkdeskapp.com/v2/talkdeskchatsdk.js'
    script.async = true
    firstScriptTag.parentNode?.insertBefore(script, firstScriptTag)

    script.onload = function () {
      // @ts-expect-error TalkdeskChatSDK is a global injected by the script
      const webchat = window.TalkdeskChatSDK('tdWebchat', {
        touchpointId: '841346da6713410e94334097b4303081',
        accountId: '',
        region: 'td-us-1',
      })

      function sendCustomerContext() {
        const customer = getAuthenticatedCustomer()
        if (customer) {
          webchat.setContextParam({
            customer_id: customer.customer_id,
            customer_email: customer.email,
            customer_name: `${customer.first_name} ${customer.last_name}`,
            authenticated: 'true',
          })
        } else {
          webchat.setContextParam({
            authenticated: 'false',
          })
        }
      }

      webchat.onConversationStart = function () {
        sendCustomerContext()
      }

      webchat.onOpenWebchat = function () {
        sendCustomerContext()
      }

      webchat.init({
        enableValidation: false,
        enableEmoji: true,
        enableUserInput: true,
        enableAttachments: true,
      })
    }
  }, [])

  return null
}
