import { Trophy, ArrowRight } from "lucide-react";
import { Card, CardContent } from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
import Link from "next/link";

export default function DrawsCard() {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-800 to-amber-900/60 flex items-center justify-center mb-4 shadow-md">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-1">Draws</h3>

        <p className="text-zinc-400 mb-6">Manage draws and results</p>

        <Link href="/admin/draws">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-5 rounded-md transition-all duration-200 flex items-center gap-2 hover:gap-3">
            Go to Draws
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
