import { useEffect, useState } from "react"
import { getCampaigns, deleteCampaign } from "../api/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, TrendingUp, MousePointer, Eye, Target } from "lucide-react"
import CampaignForm from "./CampaignForm"

function CampaignList() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editCampaign, setEditCampaign] = useState(null)

  const fetchCampaigns = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await getCampaigns()
      setCampaigns(res.data)
    } catch (err) {
      setError("Failed to load campaigns")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign?")) return
    try {
      await deleteCampaign(id)
      fetchCampaigns()
    } catch {
      setError("Delete failed")
    }
  }

  const filtered = campaigns.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))

  const calculateCTR = (clicks, impressions) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0.00"
  }

  const calculateCR = (conversions, clicks) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : "0.00"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Campaign Dashboard
          </h1>
          <p className="text-gray-600">Manage and track your marketing campaigns</p>
        </div>

        {/* Controls */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                onClick={() => {
                  setEditCampaign(null)
                  setShowForm(true)
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {loading ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading campaigns...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-0 shadow-lg border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600 text-center">{error}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filtered.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Target className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No campaigns found</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first campaign</p>
                  <Button
                    onClick={() => {
                      setEditCampaign(null)
                      setShowForm(true)
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filtered.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-gray-800">{campaign.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {new Date(campaign.date).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                              <Eye className="h-4 w-4 text-blue-600" />
                              <div>
                                <p className="text-xs text-blue-600 font-medium">Impressions</p>
                                <p className="text-lg font-bold text-blue-700">
                                  {campaign.impressions.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                              <MousePointer className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="text-xs text-green-600 font-medium">Clicks</p>
                                <p className="text-lg font-bold text-green-700">{campaign.clicks.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                              <Target className="h-4 w-4 text-purple-600" />
                              <div>
                                <p className="text-xs text-purple-600 font-medium">Conversions</p>
                                <p className="text-lg font-bold text-purple-700">
                                  {campaign.conversions.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                              <TrendingUp className="h-4 w-4 text-orange-600" />
                              <div>
                                <p className="text-xs text-orange-600 font-medium">CTR</p>
                                <p className="text-lg font-bold text-orange-700">
                                  {calculateCTR(campaign.clicks, campaign.impressions)}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditCampaign(campaign)
                              setShowForm(true)
                            }}
                            className="hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(campaign.id)}
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {showForm && (
          <CampaignForm campaign={editCampaign} onClose={() => setShowForm(false)} onSaved={fetchCampaigns} />
        )}
      </div>
    </div>
  )
}

export default CampaignList
