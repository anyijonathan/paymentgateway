import "./index.css"
import { Box } from "@mui/material"
import { Link } from "react-scroll"

import Header from "../../components/common/header/Header"
import GettingStarted from "./sections/GettingStarted"
import OnBoarding from "./sections/OnBoarding"
import PluginSetup from "./sections/PluginSetup"
import AcceptPayment from "./sections/AcceptPayment"
import VerifyPayment from "./sections/VerifyPayment"

const items = [
  {
    id: "started",
    text: "Getting Started",
    element: <GettingStarted />,
  },
  {
    id: "onboarding",
    text: "Onboarding",
    element: <OnBoarding />,
  },
  {
    id: "setup",
    text: "Setup",
    element: <PluginSetup />,
  },
  {
    id: "accept",
    text: "Accepting Payment",
    element: <AcceptPayment />,
  },
  {
    id: "verify",
    text: "Verifying Transaction",
    element: <VerifyPayment />,
  },
]

const DocxPage = () => {
  return (
    <Box className="docx-container relative">
      <Box className="background-overlay" />
      <Box className="fixed top-0 z-[999] w-full header-con">
        <Header />
      </Box>
      <Box className="docx-inner flex-grow relative mt-[65px] md:mt-[80px] lg:mt-[150px] inner-layout gap-[20px]">
        <Box className="extra" />
        <Box className="docx-sidebar lg:h-full flex flex-col gap-[10px]">
          {items.map((item, key) => {
            return (
              <Link
                key={item?.id}
                activeClass="active"
                className={`${item?.id} sidebar-link`}
                to={item?.id}
                spy={true}
                smooth={true}
                duration={500}
                offset={-150}
              >
                <span className="text">{item.text}</span>
              </Link>
            )
          })}
        </Box>
        <Box className="docx-content min-w-full max-w-full pb-[100px] flex flex-col gap-[100px]">
          {items.map((item) => {
            return (
              <Box key={item?.id} id={item?.id} className="flex flex-col gap-[20px] text-black">
                {item?.element}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default DocxPage
