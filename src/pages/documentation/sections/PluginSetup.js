import { Link } from "react-router-dom"
import { IMAGES } from "../../../assets"
import { Box } from "@mui/material"

const PluginSetup = () => {
  return (
    <>
      <h1 className="section-header">Setup</h1>
      <p>After onboarding by the business, you should be able to access the portal</p>
      <ol style={{ listStyle: "decimal" }} className="flex flex-col gap-[10px]">
        <li>
          <Link to="/login" className="text-purple font-medium">
            Login
          </Link>{" "}
          to payment gateway portal and navigate to Settings {">"} API keys to access your keys and
          merchant code
        </li>
        <Box component="img" src={IMAGES.keys} alt="access keys" className="my-3 lg:w-[70%]" />
        <li>
          Settings {">"} General and setup your website and callback URL. the callback url will be
          navigated to after the completion of card payment with the details of the transaction and
          is required
        </li>
        <Box component="img" src={IMAGES.url} alt="access keys" className="mt-3 lg:w-[70%]" />
      </ol>
    </>
  )
}

export default PluginSetup
