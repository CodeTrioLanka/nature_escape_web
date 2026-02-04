
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { fetchThingsToDo, ThingsToDoItem } from "@/api/thingsToDo.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ThingsToDoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<ThingsToDoItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadActivity = async () => {
            try {
                const data = await fetchThingsToDo();
                if (data && data.length > 0) {
                    const latestDoc = data[0];
                    const foundActivity = latestDoc.thingsToDo.find((item) => item._id === id);
                    if (foundActivity) {
                        setActivity(foundActivity);
                    } else {
                        setError("Activity not found");
                    }
                } else {
                    setError("No activities found");
                }
            } catch (err) {
                console.error("Failed to load activity", err);
                setError("Failed to load activity details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadActivity();
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-24">
                    <Skeleton className="w-full h-[60vh] rounded-xl mb-8" />
                    <Skeleton className="h-10 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </Layout>
        );
    }

    if (error || !activity) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-24 text-center">
                    <h2 className="text-2xl font-bold mb-4">Activity Not Found</h2>
                    <p className="text-muted-foreground mb-8">{error || "The requested activity could not be found."}</p>
                    <Button onClick={() => navigate("/things-to-do")}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Things to Do
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-24">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/things-to-do")}
                    className="mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Things to Do
                </Button>

                <div className="max-w-4xl mx-auto">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8 shadow-lg">
                        <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                        {activity.title}
                    </h1>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {activity.description}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ThingsToDoDetail;
