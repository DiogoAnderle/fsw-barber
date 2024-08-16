"use client"

import { Copy, SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"

interface PhoneItemProps {
  phone: string
}

const handleCopyPhoneClick = (phone: string) => {
  navigator.clipboard.writeText(phone)
  toast.success("Telefone copiado com sucesso!")
}
const onlyNumberInPhone = (phone: string) => {
  return phone
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replace(" ", "")
}

const handleWhatsappClick = (phone: string) => {
  const cleanPhone = onlyNumberInPhone(phone)
  const url = `https://wa.me/+55${cleanPhone}?text=Bom dia, aqui é o Diogo `
  alert(cleanPhone)
  window.location.href = url
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div className="flex justify-between" key={phone}>
      {/* Esquerda */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      {/* Direita */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyPhoneClick(phone)}
        >
          <Copy />
        </Button>
        <Button
          className="text-gray-400"
          variant="outline"
          size="sm"
          onClick={() => handleWhatsappClick(phone)}
          asChild
        >
          <Link href="">
            <Image
              src="/whatsapp.svg"
              width={25}
              height={25}
              alt="whatsapp logo"
            />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default PhoneItem
