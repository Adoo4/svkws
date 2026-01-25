import ShareIcon from '@mui/icons-material/Share';
function ShareButton() {
  const handleShare = async () => {
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Svjetlostkomerc Webshop",
          text: "Pogledaj ovo!",
          url: window.location.href, // current page URL
        });
        
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support the Share API.");
    }
  };

  return (
    <button onClick={handleShare} style={{ padding: "10px 20px", background:"transparent", boxShadow: "none",  all: "unset", cursor: "pointer", }}>
      <ShareIcon sx={{cursor: "pointer"}}/>
    </button>
  );
}

export default ShareButton;