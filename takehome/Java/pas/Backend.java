package pas;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;


public class Backend {

   protected static DbHandler db;

   //name of nginx service
  protected static String PROXY = "127.0.0.1";
  
    public static void main(String[] args) throws IOException {
        InetAddress ip = (InetAddress) InetAddress.getByName("0.0.0.0");
        HttpServer server = HttpServer.create(new InetSocketAddress(ip, 8080), 0); // 0 = allows buffering of *system default* requests
        db = new DbHandler();
        Handler handler = new Handler();
        server.createContext("/getPersons", handler);
        server.createContext("/insertPerson", handler);
        server.setExecutor(null);
        server.start();
    }

    static class Handler implements HttpHandler {
        @Override
        public void handle(HttpExchange he) throws IOException {
            String retBody = "";

            switch (he.getRequestMethod()) {
                case "GET":
                    //List<Person> persons = db.getAllPersons();
                    //String json = "[";
                    /*for (int i = 0; i < persons.size(); i++) {
                    json += "{\"id\":";
                    json += persons.get(i).getId();
                    json += ",\"firstname\":";
                    json += persons.get(i).getFName();
                    json += ",\"lastname\":";
                    json += persons.get(i).getLName();
                    json += "}";
                    if (i != persons.size()-1) {
                    json += ",";
                    }
                    }
                    json += "]";*/
   
                    //retBody = json;
                    
                    System.out.println("WE ARE IN A GET CASE!");
                    retBody = "WE ARE IN A GET CASE!";
                    he.sendResponseHeaders(200, retBody.getBytes().length);
                    break;
                    
                case "POST":
                    retBody = "we got POST";
                    he.sendResponseHeaders(200, retBody.getBytes().length);
                    
                    System.out.println("WE ARE IN A POST CASE!");
                    retBody = "WE ARE IN A POST CASE!";
                    
                    System.out.println(he.getRequestBody().toString());
                    
                    //db.insertPerson(new Person(0, "Patrick", "Test"));
                    
                    break;
                    
                default:
                    break;
            }
            try {
                OutputStream out = he.getResponseBody();
                out.write(retBody.getBytes());
                out.close();
            } catch (IOException e) {
            }

        }
    }
}
