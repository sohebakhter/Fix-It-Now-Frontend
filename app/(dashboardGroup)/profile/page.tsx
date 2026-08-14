import { Mail, MapPin, Globe, Link, Ban } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getMe } from "@/service/getMe";
import { EditProfileButton } from "@/app/(dashboardGroup)/profile/_components/EditProfileButton";
import EditProfileModal from "@/app/(dashboardGroup)/profile/_components/EditProfileModal";

export const instant = false;

const ProfilePage = async () => {
  const user = await getMe();
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-2">
      {/* Cover */}
      <Card className="overflow-hidden py-0">
        <div className=" h-52 bg-linear-to-r from-[#7fa0f4] via-indigo-400 to-purple-500" />

        <CardContent className="relative">
          <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="relative inline-flex">
                {user.data?.status === "BAN" && (
                  <Badge className="absolute bottom-2 right-2 z-10 rounded-full px-2 py-1 text-xs">
                    You are banned
                    <span className="text-red-500">
                      <Ban />
                    </span>
                  </Badge>
                )}
                <Avatar
                  className={`h-32 w-32 border-4 ${user.data?.status === "UN_BAN" ? "border-green-500" : "border-red-500"} shadow-lg`}
                >
                  <AvatarImage
                    src={
                      user.data?.image ||
                      "https://avatars.githubusercontent.com/u/218392443?v=4"
                    }
                  />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </div>

              <div>
                <h1 className="text-3xl font-bold">{user.data?.name}</h1>

                <p className="text-muted-foreground">{user.data?.role}</p>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.data?.email}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
            </div>
            <EditProfileButton />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {user.data?.role === "TECHNICIAN" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Experience",
              `${user.data.technicianProfile?.experience || 0} Years`,
            ],
            ["Reviews", `${user.data.technicianProfile?.reviews || 0}`],
            ["Rating", `${user.data.technicianProfile?.rating || 0}/5 ⭐`],
          ].map(([title, value]) => (
            <Card key={title}>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground text-sm">{title}</p>
                <h2 className="mt-2 text-2xl font-bold">{value}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Textarea
                rows={6}
                defaultValue="Passionate Full Stack Developer specializing in React, Next.js, Node.js, Express.js and PostgreSQL."
              />

              {/* <Button className="w-full">Save About</Button> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "Prisma",
                "PostgreSQL",
                "Tailwind",
              ].map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Link className="mr-2 h-4 w-4" />
                GitHub
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Link className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue={user.data?.name} />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input defaultValue={user.data?.email} />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input defaultValue="+8801XXXXXXXXX" />
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" />
                </div>

                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input defaultValue="Dhaka, Bangladesh" />
                </div>
              </div>

              {/* <Button className="mt-6">Save Changes</Button> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                "Updated profile information",
                "Changed password",
                "Added new project",
                "Uploaded profile photo",
              ].map((item) => (
                <div key={item}>
                  <div className="flex items-center justify-between">
                    <p>{item}</p>
                    <span className="text-sm text-muted-foreground">
                      2 days ago
                    </span>
                  </div>

                  <Separator className="mt-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <EditProfileModal user={user.data} />
    </div>
  );
};

export default ProfilePage;
