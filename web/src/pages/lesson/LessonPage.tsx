import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { lessonId } = useParams();

  return <div>LessonPage {lessonId}</div>;
};

export default LessonPage;
