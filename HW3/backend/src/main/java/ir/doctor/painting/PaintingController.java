package ir.doctor.painting;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paint")
public class PaintingController {
    private final PaintingService svc;
    public PaintingController(PaintingService svc) { this.svc = svc; }

    @GetMapping("/{username}")
    public Painting load(@PathVariable String username) {
        return svc.load(username);
    }

    @PostMapping("/{username}")
    public Painting save(@PathVariable String username, @RequestBody Painting data) {
        return svc.save(username, data);
    }
}