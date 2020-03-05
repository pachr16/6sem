/**
 * 
 
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

public class Backend {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress("localhost", 8000), 0); // 0 = allows buffering of *system default* requests
        Handler handler = new Handler();
        server.createContext("/getPersons", handler);
        server.createContext("/insertPerson", handler);
        server.setExecutor(null);
        server.start();
    }
    
    static class Handler implements HttpHandler {
        @Override
        public void handle(HttpExchange he) throws IOException {
            String test = "";
        
            switch (he.getRequestMethod()) {
                case "GET":
                test = "test GET";
                he.sendResponseHeaders(200, test.getBytes().length);
                    break;
                case "POST":
                test = "test POST";
                he.sendResponseHeaders(200, test.getBytes().length);
                    break;
                default:
                    break;
            }
            try {
                OutputStream out = he.getResponseBody();
                out.write(test.getBytes());
                out.close();
            } catch (IOException e) {
            }
            
        }
    }
}

public class DbHandler {
    static String url = "jdbc:mysql://172.17.0.2:3306/opn";
    static String dbUsername = "";
    static String dbPassword = "STDgruppe20";

    private void getAllPersons(){
        try(Connection conn = DriverManager.getConnection(url, dbUsername, dbPassword)){
            Class.forName("org.postgresql.Driver");
            
            Statement st = conn.createStatement();
            String sql = "SELECT * FROM persons;";
            ResultSet rs = st.executeQuery(sql);
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(DatabaseHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void insertPerson(){
        try(Connection conn = DriverManager.getConnection(url, dbUsername, dbPassword)){
            Class.forName("org.postgresql.Driver");
            
            Statement st = conn.createStatement();
            String sql = "Do sql here";
            ResultSet rs = st.executeQuery(sql);
            
        } catch (SQLException | ClassNotFoundException ex) {
            Logger.getLogger(DatabaseHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
*/