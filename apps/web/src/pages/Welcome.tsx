// Copyright (c) 2022 Sri Lakshmi Kanthan P
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createViewerState } from "../utilities/constructors";
import styled, { keyframes } from "styled-components";
import { Header, Footer } from "../components";
import ImgLogo from "../assets/images/logo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMsg } from "../interfaces";
import { ImportChat } from "../modals";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  Button,
} from "@mui/material";

const ContentWrapper = styled.div`
  justify-content: center;
  width: 100vw;
  display: flex;
  margin-top: 100px;
  align-items: center;
  flex-direction: column;
`;

const ImgOscillator = keyframes`
  0% {
    transform: translateY(-10px);
  }
  25% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  75% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-10px);
  }
`;

const LogoImage = styled.img`
  animation: ${ImgOscillator} 1s linear infinite;
  max-height: 300px;
  max-width: 300px;
  margin: 0 auto;
`;

const Paragraph = styled.p`
  font-size: larger;
  max-width: 600px;
  margin: 20px 10px;
  text-align: center;
  font-weight: 600;
`;

export default function Welcome() {
  // is Dialog Open State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Navigation Tool
  const navigate = useNavigate();

  // Handle Import
  const handleImport = (msgs: IMsg[], chatId: number | null) => {
    // Navigate to the chat view page
    navigate("/viewchat", { state: createViewerState(chatId, msgs) });

    // Close the dialog
    setIsDialogOpen(false);
  }

  // body component
  const Body = () => (
    <ContentWrapper>
      <Container fluid={true} style={{ margin: "80px 0px" }}>
        <Row className="d-flex flex-column flex-lg-row-reverse align-items-center justify-content-center">
          <Col lg={6} md={12} className="d-flex flex-column align-items-center justify-content-center">
            <LogoImage
              alt="Chat Viewer"
              src={ImgLogo}
            />
          </Col>
          <Col lg={6} md={12} className="d-flex flex-column align-items-center justify-content-center">
            <Paragraph>
              Missing the feel while reading Exported chats don't
              worry chat viewer comes to rescue
            </Paragraph>
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="outlined"
            >
              Import
            </Button>
          </Col>
        </Row>
        <ImportChat
          onClose={() => setIsDialogOpen(false)}
          isOpen={isDialogOpen}
          onImport={handleImport}
        />
      </Container>
    </ContentWrapper>
  );

  // renter
  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
  );
}
