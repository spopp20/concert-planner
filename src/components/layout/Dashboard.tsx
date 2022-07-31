import { useState } from 'react';
import { Container, Content, PageContainer } from "./dashboardStyles";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

type DashboardProps = {
  children: React.ReactNode,
};

export default function Dashboard({ children }: DashboardProps) {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrawer = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <Content >
        <Sidebar isOpened={isOpened} />
        < PageContainer > { children } </PageContainer>
      </Content>
      < Footer />
    </Container>
  );
}