import CodeSnippet from "../CodeSnippet";

const AcceptPayment = () => {
  return (
    <>
      <h1 className="section-header">Accepting Payment</h1>
      <p>
        Learn how to receive fast and secure payments with FCMB Payment gateway.
      </p>
      <ol style={{ listStyle: "decimal" }} className="flex flex-col gap-[10px]">
        <li className="mb-[10px]">
          Attach the payment gateway script to your website
        </li>
        <CodeSnippet canCopy language="HTML">
          {`<script src="https://paymentgatewayportal.blob.core.windows.net/paymentgatewayscript/main.js"/>`}
        </CodeSnippet>
        <li className="my-[10px]">
          Setup your payment action to call a function which would handle your payment
        </li>
        <CodeSnippet language="HTML">
          {'<button onclick="payFunction()">Pay Now</button>'}
        </CodeSnippet>
        <li className="my-[10px]">
          setup your function to call the payment gateway function.
        </li>
        <CodeSnippet canCopy language="javascript">
          {`function payFunction() { fcmbGatewayPlugin.render(payload) }

//for javascript frameworks
function payFunction() { window.fcmbGatewayPlugin.render(payload) }
          `}
        </CodeSnippet>
      </ol>
      <p className="my-2">
        The payment gateway requires an object of certain key value parameters
      </p>
      <CodeSnippet language="javascript" canCopy>
        {`const payload = { 
    merchantCode: merchantCode.value, 
    publicKey: publicKey.value, 
    onSuccess: onSuccess, 
    onFailure: onFailure 
};`}
      </CodeSnippet>
      <p>The table below shows the list of parameters;</p>
      <p>
        {
          "publicKey | string | your personal public key found in your portal | required merchantCode | string | your personal merchant code found in your portal | required paymentOption | object | control the payment options you offer e.g { card: true, payWithBank: false, payLater: false, USSD: false }. if ommitted, all options will be enabled | optional onSuccess | function | your function to be called on successful transaction(for all payment options asides pay with card) | required onFailure | function | your function to be called on failed transaction(for all payment options asides pay with card) and also when the gateway is forcefully closed | required orderId | string | unique identification for the order | required amount | string | amount being charged | required email | string | email of the customer | required customerName | string | name of the customer | optional"
        }
      </p>
    </>
  );
};

export default AcceptPayment;
