import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Tooltip, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";


function ShareButton() {
 const shareData = {
  title: "Bookstore.ba 📚✨",
  text: "Nećeš vjerovati šta sam pronašao/la! Pogledaj ovu knjigu!",
  url: window.location.href,
};


  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert(
        "Your browser does not support the Share API. Use the icons to share manually."
      );
    }
  };

  const handleSocialShare = (network) => {
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedText = encodeURIComponent(shareData.text);
    let shareUrl = "";

    switch (network) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/`;
        break;
      case "viber":
        shareUrl = `viber://forward?text=${encodedText}%20${encodedUrl}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // Shared styles for all icons
  const iconStyle = (color) => ({
    color: "#4b4b4b", // light gray by default
    transition: "color 0.3s",
    "&:hover": {
      color: color,
    },
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={0.5} backgroundColor="#212121" p={1} borderRadius="35px">
      {/* Native Share */}
      <Tooltip title="Share">
        <IconButton
          onClick={handleNativeShare}
          sx={{ color: "#4b4b4b", "&:hover": { color: "#f33600" } }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>

      {/* Social Buttons */}
      <Tooltip title="Facebook">
        <IconButton onClick={() => handleSocialShare("facebook")} sx={iconStyle("#3b5998")}>
          <FacebookIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Twitter">
        <IconButton onClick={() => handleSocialShare("twitter")} sx={iconStyle("#1da1f2")}>
          <TwitterIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="WhatsApp">
        <IconButton onClick={() => handleSocialShare("whatsapp")} sx={iconStyle("#25d366")}>
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="LinkedIn">
        <IconButton onClick={() => handleSocialShare("linkedin")} sx={iconStyle("#0077b5")}>
          <LinkedInIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Instagram">
        <IconButton onClick={() => handleSocialShare("instagram")} sx={iconStyle("#E1306C")}>
          <InstagramIcon />
        </IconButton>
      </Tooltip>

     <Tooltip title="Viber">
  <IconButton
    onClick={() => handleSocialShare("viber")}
    sx={iconStyle("#46296b")} // Viber brand color on hover
  >
    <Box
      component="img"
      src="/viber.png"
      alt="Viber"
      sx={{
        height: 23,
        width: 23,
        filter: "grayscale(100%) brightness(120%)", // light gray like other icons
        transition: "filter 0.3s",
        "&:hover": {
          filter: "grayscale(0%) brightness(100%)", // reveal true color
        },
      }}
    />
  </IconButton>
</Tooltip>




    </Box>
  );
}

export default ShareButton;
