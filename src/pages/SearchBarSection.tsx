import { SearchBar } from "../components/SearchBar";
import { motion } from "framer-motion";

interface SearchBarSectionProps {
  onSearch: (query: string) => void;
}

export const SearchBarSection: React.FC<SearchBarSectionProps> = ({ onSearch }) => (
  <motion.div className="p-4" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>
    <SearchBar onSearch={onSearch} />
  </motion.div>
);
