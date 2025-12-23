import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    category: "Basketball",
    title: "Lakers Secure Dramatic Overtime Victory Against Celtics",
    excerpt: "In a thrilling showdown, the Lakers pulled off an incredible comeback in the final minutes...",
    time: "2 hours ago",
    featured: true,
  },
  {
    category: "Soccer",
    title: "Champions League Draw Reveals Epic Matchups",
    excerpt: "The latest Champions League draw has set the stage for some incredible quarter-final battles...",
    time: "5 hours ago",
    featured: false,
  },
  {
    category: "Tennis",
    title: "Rising Star Claims First Grand Slam Title",
    excerpt: "A stunning upset as the young prodigy defeats the world number one in straight sets...",
    time: "8 hours ago",
    featured: false,
  },
  {
    category: "Football",
    title: "Trade Deadline Shakes Up League Landscape",
    excerpt: "Multiple blockbuster trades reshape the playoff picture as teams make their moves...",
    time: "12 hours ago",
    featured: false,
  },
];

export const NewsSection = () => {
  const featuredNews = newsItems[0];
  const regularNews = newsItems.slice(1);

  return (
    <section id="news" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-primary font-display text-sm uppercase tracking-widest mb-4 block">
              Stay Updated
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
              Latest <span className="text-gradient">News</span>
            </h2>
          </div>
          <Button variant="heroOutline" size="lg" className="mt-4 md:mt-0">
            View All News
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured News */}
          <motion.article
            className="group relative h-96 lg:h-full rounded-2xl overflow-hidden cursor-pointer card-gradient border border-border"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-display uppercase mb-4">
                {featuredNews.category}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {featuredNews.title}
              </h3>
              <p className="text-muted-foreground font-body mb-4 line-clamp-2">
                {featuredNews.excerpt}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>{featuredNews.time}</span>
              </div>
            </div>
          </motion.article>

          {/* Regular News */}
          <div className="space-y-6">
            {regularNews.map((news, index) => (
              <motion.article
                key={news.title}
                className="group p-6 rounded-xl card-gradient border border-border cursor-pointer hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-display uppercase mb-3">
                      {news.category}
                    </span>
                    <h3 className="font-display text-lg font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm line-clamp-1 mb-3">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-2" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};