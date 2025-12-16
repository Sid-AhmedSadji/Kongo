exports.getAdmin = async (req, res) => {
    try {
  
      res.status(200).json({ 
        message: 'Hi admin', 
      });
  
    } catch (error) {

      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };