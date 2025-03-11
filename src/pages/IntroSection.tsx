import { Box, Typography, Avatar, AvatarGroup, Button, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

interface IntroSectionProps {
  onContactClick: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onContactClick }) => (
  <motion.div className="flex-grow flex flex-col justify-center items-center text-center gap-6 p-4" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>
    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'wheat' }}>
      MovIeo is your Best choice
    </Typography>
    <Typography variant="body2" sx={{ maxWidth: '700px', lineHeight: 1.8, padding: 2, color: 'gray' }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, aliquam est quaerat recusandae repudiandae dolores eos esse quisquam, ipsum voluptate ullam quis dignissimos illum aperiam totam eum dolorem, asperiores doloremque.
    </Typography>
    <Box sx={{ display: "flex", gap: 4 }}>
      <Tooltip title="coming soon">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button sx={{ background: 'red', color: 'white' }} onClick={onContactClick}>
            Contact us
          </Button>
        </motion.div>
      </Tooltip>
      <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" />
        <Avatar alt="Travis Howard" />
        <Avatar alt="Cindy Baker" />
        <Avatar alt="Agnes Walker" />
        <Avatar alt="Trevor Henderson" />
      </AvatarGroup>
    </Box>
  </motion.div>
);
