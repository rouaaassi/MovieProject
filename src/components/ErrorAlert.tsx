import { Alert } from "@mui/material";
import { motion } from "framer-motion";

interface ErrorAlertProps {
  error: string | null;
  onClose: () => void;
}
export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null;
  
  return (
    <motion.div className="p-4 mt-[30px]" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>
      <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
        {error}
      </Alert>
    </motion.div>
  );
};
