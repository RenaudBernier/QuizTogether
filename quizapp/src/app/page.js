import JoinQuiz from '../../components/JoinQuiz';
import Welcome from '../../components/Welcome';
import FileDropzone from './dropzone component';

export default function Home() {
    return (
        <main className="flex flex-col justify-center gap-[32px] items-center min-h-screen text-center pt-24 md:pt:16 mx-auto px-6">
          <Welcome />
          <section className="flex flex-col md:flex-row gap-8">
            <FileDropzone />
            <JoinQuiz />
          </section>
        </main>
    );
  }
  