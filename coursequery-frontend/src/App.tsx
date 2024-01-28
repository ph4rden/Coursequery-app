import { Button } from "@/components/ui/button";
import Nav from './components/ui/Nav/Nav';

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline text-red-800">
      <Nav />
      Hello world!
      <Button>Click me</Button>
    </h1>
  )
} 