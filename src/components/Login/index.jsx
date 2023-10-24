import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { PrimaryButton } from "@common/Buttons";

import { login } from "@redux/Slices/authSlice";
import { GRAY_300, PRIMARY_900 } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  row-gap: 3.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const InputContainer = styled(FlexBox)`
  width: 27rem;

  input {
    width: 100%;
    font-size: 0.875rem;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid ${GRAY_300};
  }

  button {
    width: 100%;
    padding: 0.75rem 1rem;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const authLoading = useSelector(state => state?.auth?.loading);
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });

  const { email, password } = userCreds;

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setUserCreds(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    try {
      dispatch(login(userCreds));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <FlexBox align="center" colGap="0.5rem">
        <Image
          priority
          width={56}
          height={56}
          draggable="false"
          alt="Unispace Logo"
          src="/assets/images/unispace-logo.svg"
        />
        <Text bold size="2.5rem" color={PRIMARY_900}>
          Unispace
        </Text>
      </FlexBox>
      <FlexBox column rowGap="1.5rem">
        <InputContainer>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleInput}
            placeholder="Email Address"
          />
        </InputContainer>
        <InputContainer>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleInput}
            placeholder="Password"
            onKeyDown={e => {
              if (email && password && e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handleLogin();
              }
            }}
          />
        </InputContainer>
        <InputContainer>
          <PrimaryButton
            onClick={handleLogin}
            disabled={!email || !password || authLoading}
          >
            Log in
          </PrimaryButton>
        </InputContainer>
      </FlexBox>
    </Wrapper>
  );
};

export default Login;
