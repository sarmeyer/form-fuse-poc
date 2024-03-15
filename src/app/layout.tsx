import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GraphQLClientProvider } from "@/GraphQLClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fuse App POC",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GraphQLClientProvider>{children}</GraphQLClientProvider>
      </body>
    </html>
  )
}
