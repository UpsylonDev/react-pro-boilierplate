# Features descriptions
<!-- Features prompts : just faire @feature1 pour lancer le prompt -->

Crée une nouvelle fonctionnalité : {{feature_name}}

Description détaillée : {{description}}

Exigences techniques :
- Framework utilisé : {{framework}}
- Type de composant : {{component_type}}
- Tests requis : {{tests_required}}

Instructions spécifiques : {{instructions}}

## Exemples d'usage des prompts importés

### 1. Utilisation basique
Tapez simplement `@feature1` dans la conversation avec Claude Code pour déclencher ce prompt.

### 2. Cas d'usage typiques

#### Développement de nouvelles fonctionnalités
```
@feature1 feature_name="Authentification" description="Système de login/logout avec JWT" framework="React" component_type="Hook + Context" tests_required="true" instructions="Utiliser localStorage pour le token"
```

#### Amélioration d'une fonctionnalité existante  
```
@feature1 feature_name="Validation formulaires" description="Messages d'erreur en temps réel" framework="React" component_type="Custom Hook" tests_required="true" instructions="Utiliser react-hook-form"
```

#### Refactoring de code
```
@feature1 feature_name="Optimisation Header" description="Améliorer les performances" framework="React" component_type="Functional Component" tests_required="false" instructions="Utiliser React.memo et useMemo"
```

### 3. Avantages des prompts
- **Réutilisabilité** : Même prompt pour différents projets
- **Consistance** : Approche standardisée pour chaque feature  
- **Efficacité** : Évite de réécrire les mêmes instructions
- **Collaboration** : Équipe utilise les mêmes prompts

### 4. Syntaxe des paramètres
- **Variables** : `{{nom_variable}}` dans le prompt
- **Passage** : `@feature1 nom_variable="valeur"`
- **Multiples** : `@feature1 param1="valeur1" param2="valeur2"`
- **Espaces** : Utilisez des guillemets pour les valeurs avec espaces

### 5. Bonnes pratiques
- Définissez des variables claires avec `{{variable}}`
- Utilisez des noms de paramètres descriptifs
- Documentez les paramètres attendus en commentaire
- Testez avec différentes valeurs de paramètres