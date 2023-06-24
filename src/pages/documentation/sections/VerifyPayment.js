import CodeSnippet from "../CodeSnippet"

const VerifyPayment = () => {
  return (
    <>
      <h1 className="section-header">Verify Transaction</h1>
      <p>Confirm the status of a transaction</p>
      <h1 className="section-sub-header mt-5">Request</h1>
      <ul style={{ listStyleType: "unset" }} className="flex flex-col gap-[10px]">
        <li>Headers authorization | string | Set value to Bearer your private key</li>
        <li>
          Path Parameters transactionRef | string | The transaction reference recieved when the
          transaction completed
        </li>
        <li>
          Query Parameters sof | bool | If to return the tokenized source of funds for the
          transaction in the response
        </li>
      </ul>
      <CodeSnippet language="API" canCopy>
        {`GET: https://devapi.fcmb.com/paymentgatewaymiddleware2/api/transactions/verify/transactionRef?sof=true

-H "Authorization: Bearer YOUR_PRIVATE_KEY"`}
      </CodeSnippet>
      <h1 className="section-sub-header mt-5">Sample Response</h1>
      <CodeSnippet language="JSON">
        {`200: { 
"status": true, "message": "Verification successful", 
"data": { "transactionRef": 2009945086, "orderId": "test", "merchantCode": "success", "customerId": "rd0bz6z2wu", "customerName": 20000, "transactionStatus": null, "amount": "Successful", "createdAt": "2022-08-09T14:20:57.000Z", "channel": "card", "currency": "NGN", "ip_address": "100.64.11.35", "metadata": "", 
"sof": { "bin": "408408", "last4": "4081", "expiryMonth": "12", "expiryYear": "2030", "channel": "card", "cardType": "visa", "bank": "TEST BANK", "brand": "visa", "reusable": true }, 
"customer": { "name": null, "email": "hello@email.com", "customerCode": "1111111", "phone": null } 
    } 
}`}
      </CodeSnippet>
    </>
  )
}

export default VerifyPayment
