import Image from "next/image";

import { THandleStep } from "../../pages";
import { icons } from "../../utils/images";
import SecondaryBtn from "../SecondaryBtn";
import PrimaryBtn from "../PrimaryBtn";
import { MouseEvent, useEffect, useState } from "react";
import OtpInput from "../OtpInput";

interface IConnectWallet extends THandleStep {
  signIn: (val: string) => Promise<void>;
  handleLensLogin: () => void;
  showOtp: boolean;
  loading: boolean;
  showMsg: boolean;
  loader?: boolean;
}

export default function ConnectWallet(props: IConnectWallet) {
  const { signIn, loader, handleLensLogin, showOtp, loading, showMsg } = props;
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [enableVerifyBtn, setEnableVerifyBtn] = useState(false);

  const onChange = (val: string) => {
    setOtp(val);
  };

  useEffect(() => {

    // Check the length and set 'enableVerifyBtn' accordingly.
    if (otp.trim().length === 6) {
      setEnableVerifyBtn(true);
    } else {
      setEnableVerifyBtn(false);
    }
  }, [otp]);

  const handleInputChange = (val: string) => {
    setValue(val);
  };
  return (
    <>
      <div className="w-full relative">
        <div className="w-full text-center p-2 relative">
          <div className="mb-4 lg:mb-5">
            <p className="text-sm md:text-base font-bold leading-1 text-black mb-4 md:mb-4">
              STEP 1
            </p>
            <p className="text-md md:text-lg font-bold leading-1 text-black mb-3 md:mb-4">
              Connect your wallet
            </p>
            <p className="text-sm md:text-base font-regular leading-1 md:leading-[30px] text-black">
              Enable access to your wallet to load <br /> your assets to the
              chest
            </p>
          </div>
          <Image
            className="m-auto mb-[30px] lg:mb-5 w-[50%] md:w-[25%] lg:w-[20%]"
            src={icons.tchest}
            alt="Chest"
          />

          {/* <div className="flex gap-3 justify-center items-center w-[80%] md:w-[60%] lg:w-[360px] h-[64px] mx-auto rounded-lg mb-6 lg:mb-4">
                        <SecondaryBtn
                            leftImage={icons.walletIcon ?? ""}
                            title={connecting ? "Connecting..." : "Connect your wallet"}
                            onClick={connectWallet}
                        />
                    </div> */}

          {loader ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="spinnerLoader"></div>

              <p className=" mt-5 opacity-50 mb-14 text-[16px] leading-14 text-black">
                Setting up Smart Account!
              </p>
            </div>
          ) : (
            <>
              {!showMsg ? (
                // <div className={`flex gap-3 justify-center items-center w-[80%] md:w-[60%] lg:w-[360px] mx-auto rounded-lg mt-10 mb-5 custom-shadow-sm border border-black`}>
                //   <button
                //     className={`py-4 w-full rounded-lg btnBg flex gap-2 items-center justify-center max-w-[400px]`}
                //     onClick={handleLensLogin}
                //   >
                //     <Image
                //       src={icons.lensLogo}
                //       alt="lens login"
                //       className="w-6 rounded-full"
                //     />
                //     <span className="text-[16px] leading-1 font-medium text-black self-center my-auto">
                //       {"Sign in with Lens"}
                //     </span>
                //   </button>
                // </div>
                <PrimaryBtn title={"Sign in With Lens"} leftImage={icons.lensLogo} onClick={handleLensLogin} className="mb-4" />
              ) : null}
              {!showMsg ? (
                <div className="flex items-center justify-center w-[80%] md:w-[60%] lg:w-[360px] mx-auto mb-4">
                  <div className="border-t border-black/20 flex-grow"></div>
                  <p className="text-black/80 mx-4">OR</p>
                  <div className="border-t border-black/20 flex-grow"></div>
                </div>
              ) : null}
              <div className={`flex gap-3 justify-center items-center w-[80%] md:w-[60%] lg:w-[400px] mx-auto rounded-lg ${showMsg ? "custom-shadow-sm border border-black" : ""}`}>
                <>
                  {showMsg ? (
                    <div className="text-center">
                      <p className="font-semibold text-[20px] text-black mb-4">
                        Check your email!
                      </p>
                      <p className="text-black/80 leading-[30px]">
                        We emailed a magic link to <br />
                        <span className="text-black font-semibold">{value}</span> <br />
                        Please click the link to continue.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full mx-auto max-w-[400px]">
                      <input
                        name={"Enter email address"}
                        style={{
                          caretColor: "black",
                        }}
                        inputMode="text"
                        type="string"
                        className={`rounded-lg border border-black/80 bg-white/5 p-2 cursor-pointer mb-4 pl-0 py-3 backdrop-blur-xl text-[14px] text-center  text-black placeholder-black/20 block w-full focus:outline-none focus:ring-transparent`}
                        placeholder={"Enter your email address"}
                        value={value}
                        onChange={(e) => {
                          handleInputChange(`${e.target.value}`);
                        }}
                        onWheel={() =>
                          (document.activeElement as HTMLElement).blur()
                        }
                      />
                      <div className="my-4 cursor-pointer">
                        <SecondaryBtn
                          className={`${value ? "opacity-100" : "opacity-40"
                            }`}
                          title={loading ? "Loading..." : "Sign in with Magic Link"}
                          btnDisable={!value}
                          onClick={() => {
                            signIn(value);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
