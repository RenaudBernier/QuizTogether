import Welcome from '../../components/Welcome';
import FileDropzone from '../../components/dropzone component';

export default function Home() {
    return (
        <main className="flex flex-col justify-center gap-[40px] items-center min-h-screen text-center pt-16 mx-auto px-6">
          <Welcome />
          <FileDropzone />
        </main>
    );
  }
  