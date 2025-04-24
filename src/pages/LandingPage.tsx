
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/utils/auth";

const LandingPage = () => {
  const handleSignIn = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <main className="flex-1">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
            Smart Spend Monitor
            <span className="block text-purple-600">Track Your Finances</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 leading-8">
            Take control of your financial future with our comprehensive expense tracking
            and budget management solution.
          </p>
          
          <div className="mt-10">
            <Button
              onClick={handleSignIn}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <Card className="bg-white/50 backdrop-blur border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Easy Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Monitor your expenses with intuitive tools and real-time updates</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Smart Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get intelligent analytics and personalized recommendations</p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-purple-800">Secure Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your financial data is protected with enterprise-grade security</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
