import { useSelector } from "react-redux";
import { Component, useRef } from "react";
import { withIdleTimer } from "react-idle-timer";

import useLogout from "../services/hooks/useLogout";

class IdleTimerComponent extends Component {
  render() {
    return this.props.children;
  }
}
const IdleTimer = withIdleTimer(IdleTimerComponent);

const IdleLogout = () => {
  const isLoggedIn = useSelector((state) => state?.userAuth?.isLoggedIn);
  const idleTimer = useRef(null);
  const logoutUser = useLogout();

  const timer = 2 * 60 * 1000;

  const onIdleHandler = () => {
    if (isLoggedIn) {
      logoutUser();
    }
  };

  return <IdleTimer ref={idleTimer} timeout={timer} onIdle={onIdleHandler} />;
};

export default IdleLogout;
