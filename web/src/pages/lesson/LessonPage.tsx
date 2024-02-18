import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getLessonById } from "../../helpers/api-communicator";

import toast from "react-hot-toast";

import YouTubeVideo from "./ui/YouTubeVideo";
import LessonChat from "./ui/LessonChat";

const LessonPage = () => {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { lesson } = await getLessonById(lessonId || "");
        setLesson(lesson);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load lessonInfo", { id: "lessonInfo" });
      }
    };

    fetchLesson();
  }, [lessonId]);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {lesson && (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="antialased text-4xl font-semibold">
              {lesson?.title}
            </h1>

            <p className="text-pretty">{lesson?.description}</p>

            <YouTubeVideo />
          </div>
          <LessonChat chat={lesson?.Chat} />
        </>
      )}
    </div>
  );
};

export default LessonPage;
