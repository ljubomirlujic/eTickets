import "../assets/css/style.css";
import MainLayout from "../layouts/MainLayout";
import EventContainer from "../containers/EventContainer";
function Home() {
  return (
    <MainLayout>
      <EventContainer />
    </MainLayout>
  );
}

export default Home;
