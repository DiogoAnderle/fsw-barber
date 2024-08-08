import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Header from "./_components/header"

import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
export default function Home() {
  return (
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Diogo!</h2>
        <p className="">Quinta-feira, 08 de agosto de 2024.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}
