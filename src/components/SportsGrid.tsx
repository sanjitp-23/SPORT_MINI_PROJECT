import { motion } from "framer-motion";
import basketballImage from "@/assets/basketball.jpg";
import soccerImage from "@/assets/soccer.jpg";
import tennisImage from "@/assets/tennis.jpg";
import footballImage from "@/assets/football.jpg";

const sports = [
  { name: "Basketball", image: basketballImage, events: 128 },
  { name: "Soccer", image: soccerImage, events: 256 },
  { name: "Tennis", image: tennisImage, events: 84 },
  { name: "Football", image: footballImage, events: 64 },
];

export const SportsGrid = () => {
  return (
    <section id="sports" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-display text-sm uppercase tracking-widest mb-4 block">
            Featured
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
            Popular <span className="text-gradient">Sports</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Dive into the action with our comprehensive coverage of the world's most exciting sports.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.name}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-bold uppercase text-foreground mb-1">
                  {sport.name}
                </h3>
                <p className="text-primary font-body text-sm">
                  {sport.events} Live Events
                </p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-display uppercase">
                  View All
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};