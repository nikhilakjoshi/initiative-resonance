import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Person-Centered at Scale",
    description:
      "Technology that adapts to each individual's unique needs and circumstances",
  },
  {
    title: "Evidence-Based",
    description:
      "Grounded in decades of research from leading institutions worldwide",
  },
  {
    title: "Community-Embedded",
    description:
      "Breaking down every barrier of language, location, and circumstance",
  },
];

export function FeatureCardsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:shadow-lg transition-all duration-300 h-fit"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
