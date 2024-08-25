"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Plus, Minus } from "lucide-react"

export default function Component() {
  const [image, setImage] = useState<string | null>(null)
  const [showLinks, setShowLinks] = useState(false)
  const [links, setLinks] = useState([''])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLink = () => {
    setLinks([...links, ''])
  }

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index)
    setLinks(newLinks)
  }

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg">
      <Card className="w-full bg-white bg-opacity-70 backdrop-blur-sm border border-purple-200">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-3xl text-center text-gray-700 font-bold mb-6">Create Coin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="w-full aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-purple-300 transition-all duration-300 hover:border-purple-400 hover:shadow-md"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Uploaded coin image" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <Upload className="mx-auto h-16 w-16 text-purple-400" />
                  <p className="mt-4 text-sm font-medium text-purple-600">Click to upload coin image</p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Coin Name</Label>
                <Input id="name" placeholder="Enter coin name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticker">Ticker Symbol</Label>
                <Input id="ticker" placeholder="Enter ticker symbol" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your coin" />
              </div>
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowLinks(!showLinks)}
                  className="w-full"
                >
                  {showLinks ? 'Hide Links' : 'Add Links'}
                </Button>
                {showLinks && (
                  <div className="space-y-2">
                    {links.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Enter link ${index + 1}`}
                          value={link}
                          onChange={(e) => updateLink(index, e.target.value)}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeLink(index)}
                          aria-label={`Remove link ${index + 1}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addLink}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Another Link
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-8">
          <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg" variant="default">
            Create Coin
          </Button>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="bg-white text-indigo-500 border-indigo-300 hover:bg-indigo-50 font-semibold text-lg py-6 rounded-xl transition-all duration-300">Buy</Button>
            <Button variant="outline" className="bg-white text-pink-500 border-pink-300 hover:bg-pink-50 font-semibold text-lg py-6 rounded-xl transition-all duration-300">Sell</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}