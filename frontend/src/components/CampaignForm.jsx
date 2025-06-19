import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { X, Save, Plus } from "lucide-react"
import { createCampaign, updateCampaign } from "../api/api"

function CampaignForm({ campaign, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: campaign?.name || "",
    date: campaign?.date || "",
    impressions: campaign?.impressions || 0,
    clicks: campaign?.clicks || 0,
    conversions: campaign?.conversions || 0,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (campaign) {
        await updateCampaign(campaign.id, form)
      } else {
        await createCampaign(form)
      }
      onSaved()
      onClose()
    } catch (err) {
      setError("Save failed")
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            {campaign ? <Save className="h-6 w-6 text-blue-600" /> : <Plus className="h-6 w-6 text-blue-600" />}
            {campaign ? "Edit Campaign" : "Create Campaign"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Campaign Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter campaign name"
                value={form.name}
                onChange={handleChange}
                required
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Campaign Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="impressions" className="text-sm font-medium text-gray-700">
                  Impressions
                </Label>
                <Input
                  id="impressions"
                  name="impressions"
                  type="number"
                  placeholder="0"
                  value={form.impressions}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clicks" className="text-sm font-medium text-gray-700">
                  Clicks
                </Label>
                <Input
                  id="clicks"
                  name="clicks"
                  type="number"
                  placeholder="0"
                  value={form.clicks}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conversions" className="text-sm font-medium text-gray-700">
                  Conversions
                </Label>
                <Input
                  id="conversions"
                  name="conversions"
                  type="number"
                  placeholder="0"
                  value={form.conversions}
                  onChange={handleChange}
                  required
                  className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? "Saving..." : campaign ? "Update Campaign" : "Create Campaign"}
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignForm
