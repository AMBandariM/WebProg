package ir.doctor.painting;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaintingService {
    private final PaintingRepository repo;
    public PaintingService(PaintingRepository repo) { this.repo = repo; }

    public Painting load(String username) {
        return repo.findById(username).orElseGet(() -> {
            Painting p = new Painting();
            p.setUsername(username);
            p.setTitle("Untitled");
            p.setShapes(List.of());
            return p;
        });
    }

    public Painting save(String username, Painting data) {
        data.setUsername(username);
        return repo.save(data);
    }
}