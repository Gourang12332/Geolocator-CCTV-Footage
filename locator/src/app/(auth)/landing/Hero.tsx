import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

function LandingText() {
  return (
    <div className="flex w-1/2 flex-col gap-6">
      <CardTitle className="text-5xl">
      Track and locate individuals across multiple CCTV cameras
      </CardTitle>
      <CardDescription className="text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat iure
        magni laudantium nisi impedit hic iste aliquid debitis ducimus,
        dignissimos omnis! Similique saepe minus rerum magnam architecto
        doloribus, quos ad.
      </CardDescription>
      <div className="flex gap-4">
        <Button className="rounded-full px-8 py-4 text-base shadow-md">
          Task 1
        </Button>
        <Button
          variant="outline"
          className="rounded-full px-8 py-4 text-base shadow-md"
        >
          Task 2
        </Button>
      </div>
    </div>
  )
}

const serviceOption = [
  {
    title: 'Multi-camera Feature detection',
    link: '/',
    description:
      'FastReid enables accurate, robust identification and tracking hence allowing for precise cross-camera tracking',
  },
  {
    title: 'Real Time Tracking',
    link: '/',
    description:
      'We are giving real time position and identification of all the individuals inside the camera frame',
  },
  {
    title: 'Scalability',
    link: '/',
    description:
      'With the use of Chroma for efficient vector storage the system is built to scale easily',
  },
  {
    title: 'Meow',
    link: '/',
    description:
      'With the use of Chroma for efficient vector storage the system is built to scale easily',
  },
]

function Options() {
  return (
    <div className="flex flex-wrap w-1/2 items-center justify-center gap-8">
      {serviceOption.map((service) => {
        return (
          <Card
            className="delay-400 flex h-48 w-72 flex-col shadow-lg ease-in-out hover:-translate-y-1 hover:translate-x-1 hover:transition-transform"
            key={service.title}
          >
            <Link
              href={service.link}
              className="flex flex-grow flex-col justify-center p-8"
            >
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-grow items-center gap-12">
      <LandingText />
      <Options />
    </div>
  )
}
