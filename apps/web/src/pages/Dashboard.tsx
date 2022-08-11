// Copyright (c) 2022 Sri Lakshmi Kanthan P
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Header, Footer, UserView, ChatView } from "../components";
import { selectUser, selectJwt } from "../redux/slices/userSlice";
import { IUser, IChat } from "../interfaces";
import { useSelector } from "react-redux";
import styled from "styled-components";
import React, { useState } from "react";
import { useGetChats } from "../apiClients/chatApi";

// Dashboard Wrapper
const DashboardWrapper = styled.div`
  justify-content: space-between;
  min-height: calc(100vh - 200px);
  width: 100%;
  margin-top: 100px;
  margin-bottom: 60px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: column;
`;

export default function Dashboard() {
  // sort by state
  const [sortBy, setSortBy] = useState<"name" | "createdAt" | "updatedAt">("name");

  // page number
  const [pageNumber, setPageNumber] = useState<number>(1);

  // user details
  const user: IUser | null = useSelector(selectUser);

  // jwt token
  const jwt: string | null = useSelector(selectJwt);

  // if no user throw
  if (!user || !jwt) {
    throw new Error("No User found");
  }

  // chats for the dashboard
  const {
    isPreviousData : isPrevData,
    isError,
    data,
    error,
    isFetching,
  } = useGetChats({
    userId: user.userId,
    jwt: jwt,
    params: {
      page: pageNumber,
      perPage: 5, // it is a constant
      sortBy: sortBy,
    },
  });

  // if error throw
  if (isError) {
    throw new Error("Error in getting chats: " + error);
  }

  // Header Link
  const link = data ? data.headers["link"] : undefined;

  // on prev handler
  const onPrev = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  }

  // on next handler
  const onNext = () => {
    if (!isPrevData && link?.includes("next")) {
      setPageNumber(pageNumber + 1);
    }
  };

  // body
  const Body = () => (
    <DashboardWrapper>
      <UserView
        onDelete={() => null}
        onEdit={() => null}
        user={user}
      />
      <ChatView
        onDelete={() => null}
        onOpen={() => null}
        onEdit={() => null}
        isFetching={isFetching}
        setSortBy={setSortBy}
        sortBy={sortBy}
        onPrev={onPrev}
        onNext={onNext}
        hasPrev={pageNumber > 1}
        chats={data?.data || null}
        hasNext={!isPrevData && link?.includes("next") || false}
      />
    </DashboardWrapper>
  );

  return (
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
  );
}
