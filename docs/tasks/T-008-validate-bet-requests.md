# T-008 · Validar las apuestas (montos y números) de ruleta y dados
- Estado: Lista · Prioridad: P0 🔴 · Esfuerzo: M · Ejecuta: 🤖 agente gratuito
- Fase: P0 Estabilizar
- Rama: `fix/T-008-validate-bets` (crearla desde `main` actualizado antes del primer commit) · Depende de: T-005, T-009 · Spec/ADR: —
- Revisa: 🧠 modelo de frontera (toca créditos)
- Título del PR: `fix(server): validate roulette and dice bet requests`

## Por qué
`POST /v1/api/game/play-roulette` con `betAmount: -500` responde 200 y **suma** 500 créditos; con `NUMBER` sin `betNumber` lanza NPE (`GameService.java:65-80,179-181`). Los DTOs no tienen validaciones (`dto/RouletteBetRequestDto.java`, `dto/DiceBetRequestDto.java`) y los controllers no usan `@Valid` (`GameController.java:42-52`). Auditoría §4 (probe "ruleta negativa") y §6.

## Objetivo
Toda apuesta inválida responde **400** sin tocar los créditos; las válidas se comportan igual que hoy.

## Alcance
- Incluye:
  - `RouletteBetRequestDto`: `@NotNull betTypeRoulette`; `@NotNull @Min(1) betAmount`; `@Min(0) @Max(36) betNumber`.
  - `DiceBetRequestDto`: `@NotNull betType`; `@NotNull @Min(1) betAmount`; `@Min(1) @Max(12) betDice1`; `@Min(1) @Max(6) betDice2`.
  - `@Valid` en los `@RequestBody` de `playRoulette` y `playDice`.
  - En `GameService`: si el tipo es `NUMBER` y `betNumber` es `null`, o el tipo de dado es `INDIVIDUAL` y `betDice1`/`betDice2` son `null` o mayores a 6 → lanzar la excepción de "request inválido" que define T-009 (mapeada a 400).
- **No incluye:** cambiar pagos, `Random`, transacciones, el registro de dados ni la UI.

## Leer antes
- `service/GameService.java:55-105` y `183-225` · los dos DTOs · `controller/GameController.java:42-52`
- Test de referencia de slice web y unitario: ver `docs/TESTING.md` → "Archivos de referencia" (creados en T-005)
- Excepción de "request inválido" de T-009: ver `docs/ARCHITECTURE.md` → manejo de errores

## Archivos previstos
- modificar: `RouletteBetRequestDto.java`, `DiceBetRequestDto.java`, `GameController.java`, `GameService.java` · crear: `GameControllerTest.java` (`@WebMvcTest`), `GameServiceTest.java` (unitario con Mockito)

## Tests (escribirlos primero: tienen que fallar antes del fix)
- Slice (`GameControllerTest`, `@WithMockUser`): `betAmount` = `-500`, `0` y `null` → 400; `betNumber` = `37` → 400; `betTypeRoulette` ausente → 400; dados con `betDice2` = `7` → 400; apuesta válida (`COLOR`, 10) → 200.
- Unitario (`GameServiceTest`, repositorios mockeados): `NUMBER` sin `betNumber` → excepción de request inválido y `userRepository.save` **nunca** llamado; créditos insuficientes → excepción actual y sin `save`.

## Pasos sugeridos
1. Rama. 2. Tests nuevos → corren y fallan (`./mvnw test -Dtest=GameControllerTest`). 3. Anotaciones y `@Valid`. 4. Chequeos en el servicio. 5. `./scripts/verify.sh`.

## Criterios de aceptación
- [ ] Los tests nuevos fallaban antes del fix (dejalo anotado en "Notas") y pasan después.
- [ ] Con la app levantada en segundo plano (`AGENTS.md` §3): `curl` de ruleta con `betAmount:-500` (ver el probe en la auditoría §4) → 400 y `GET /v1/api/user` muestra los mismos créditos que antes.
- [ ] `./scripts/verify.sh` en verde y la cobertura no baja.
- [ ] La ruleta de la UI sigue funcionando con una apuesta normal.

## Notas de implementación
- Hecho: … · Pendiente: … · Próximo paso: …

## Resultado
- PR: #N · Qué cambió: … · Tests agregados: … · Pendientes → …
