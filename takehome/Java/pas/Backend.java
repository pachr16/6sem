package pas;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Scanner;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;


public class Backend {

   protected static DbHandler db;
  
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
                    List<Person> persons = db.getAllPersons();
                    String json = "[";
                    for (int i = 0; i < persons.size(); i++) {
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
                    json += "]";
   
                    retBody = json;
                    
                    he.sendResponseHeaders(200, retBody.getBytes().length);
                    break;
                    
                case "POST":

                    Scanner scan  = new Scanner(he.getRequestBody()).useDelimiter("&");

                    Person pers = new Person();

                    while(scan.hasNext()) {
                        String next = scan.next();
                        if(next.contains("firstname=")) {
                            pers.setFName(next.split("=", 2)[1]);
                        } else if(next.contains("lastname=")){
                            pers.setLName(next.split("=", 2)[1]);
                        }
                    }

                    //retBody = "WE ARE IN A POST CASE!";

                    he.sendResponseHeaders(200, 0);
                    
                    db.insertPerson(pers);
                    
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
