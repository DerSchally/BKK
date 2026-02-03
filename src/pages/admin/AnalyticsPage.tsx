import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  MapPin,
  Activity,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { shelters } from '@/data';
import { shelterStatuses, shelterTypes, germanStates } from '@/data/masterData';

// Calculate stats from shelters
const statusData = shelterStatuses.map((status) => ({
  name: status.labelDe,
  value: shelters.filter((s) => s.status === status.status).length,
  color: status.color,
}));

const typeData = shelterTypes.map((type) => ({
  name: type.labelDe,
  value: shelters.filter((s) => s.type === type.type).length,
  icon: type.icon,
}));

// Calculate capacity by state
const stateData = germanStates.map((state) => {
  const stateShelters = shelters.filter((s) => s.address.state === state.name);
  return {
    name: state.code,
    fullName: state.name,
    shelters: stateShelters.length,
    capacity: stateShelters.reduce((sum, s) => sum + s.capacity, 0),
  };
}).filter((s) => s.shelters > 0).sort((a, b) => b.capacity - a.capacity);

// Mock monthly trend data
const trendData = [
  { month: 'Aug', shelters: 45, capacity: 120000 },
  { month: 'Sep', shelters: 47, capacity: 128000 },
  { month: 'Okt', shelters: 49, capacity: 135000 },
  { month: 'Nov', shelters: 51, capacity: 140000 },
  { month: 'Dez', shelters: 52, capacity: 141000 },
  { month: 'Jan', shelters: 53, capacity: 142500 },
];

export function AnalyticsPage() {
  const totalCapacity = shelters.reduce((sum, s) => sum + s.capacity, 0);
  const avgCapacity = Math.round(totalCapacity / shelters.length);
  const accessibleCount = shelters.filter((s) => s.accessibility.wheelchair).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analysen</h1>
          <p className="text-slate-600">Statistische Auswertungen und Trends</p>
        </div>
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Zeitraum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Letzte 7 Tage</SelectItem>
            <SelectItem value="30">Letzte 30 Tage</SelectItem>
            <SelectItem value="90">Letzte 90 Tage</SelectItem>
            <SelectItem value="365">Letztes Jahr</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtkapazität</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +2.500 zum Vormonat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ø Kapazität</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCapacity.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Personen pro Schutzraum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Quote</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((shelters.filter((s) => s.status === 'active').length / shelters.length) * 100)}%
            </div>
            <p className="text-xs text-slate-500">
              {shelters.filter((s) => s.status === 'active').length} von {shelters.length} aktiv
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barrierefrei</CardTitle>
            <Building2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((accessibleCount / shelters.length) * 100)}%
            </div>
            <p className="text-xs text-slate-500">{accessibleCount} Schutzräume</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Verteilung nach Status</CardTitle>
                <CardDescription>Aktueller Status aller Schutzräume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {statusData.map((status) => (
                    <div key={status.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="text-sm">{status.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Verteilung nach Typ</CardTitle>
                <CardDescription>Schutzraumtypen im Überblick</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={typeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kapazität nach Bundesland</CardTitle>
              <CardDescription>Verteilung der Schutzraumkapazitäten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => [
                        name === 'capacity' ? (value as number).toLocaleString() + ' Plätze' : value,
                        name === 'capacity' ? 'Kapazität' : 'Schutzräume',
                      ]}
                      labelFormatter={(label) => stateData.find((s) => s.name === label)?.fullName}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="capacity" fill="#3B82F6" name="Kapazität" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="shelters" fill="#22C55E" name="Schutzräume" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* State Details */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stateData.slice(0, 6).map((state) => (
              <Card key={state.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {state.fullName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Schutzräume</span>
                      <span className="font-medium">{state.shelters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Kapazität</span>
                      <span className="font-medium">{state.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Ø pro Schutzraum</span>
                      <span className="font-medium">
                        {Math.round(state.capacity / state.shelters).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entwicklung über Zeit</CardTitle>
              <CardDescription>Anzahl Schutzräume und Kapazität (letzte 6 Monate)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="shelters"
                      stroke="#3B82F6"
                      name="Schutzräume"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="capacity"
                      stroke="#22C55E"
                      name="Kapazität"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Growth Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wachstum Schutzräume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+17.8%</div>
                <p className="text-sm text-slate-500">Gegenüber Vorjahr</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kapazitätszuwachs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+18.750</div>
                <p className="text-sm text-slate-500">Neue Plätze in 6 Monaten</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Neue Registrierungen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">8</div>
                <p className="text-sm text-slate-500">Im letzten Monat</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
