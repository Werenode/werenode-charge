import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import CarteDesBornes from "./components/CarteDesBornes";
import ( bornes ) from "./data/bornes";
import { Menu, X, MapPin, Phone, Mail, Zap, Battery, Share2, ArrowRight, ChevronDown, Users, Clock, Euro, Star, Filter, Navigation, CheckCircle, TrendingUp, Shield, Wifi, Calendar, MessageCircle, Leaf } from 'lucide-react';

const evIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const WerenodeChargeSite = () => {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedBorne, setSelectedBorne] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { key: 'accueil', label: 'Accueil' },
    { key: 'partager', label: 'Partagez votre borne' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: 'Contact' },
    { key: 'qui-sommes-nous', label: 'À propos' }
  ];

  const faqData = [
    {
      question: 'Comment fonctionne Werenode Charge VE?',
      answer: 'Werenode Charge VE est une plateforme collaborative qui connecte les propriétaires de bornes de recharge avec les conducteurs de véhicules électriques. Via notre application, vous pouvez localiser, réserver et payer votre recharge en quelques clics. Tout est automatisé et sécurisé grâce à notre technologie blockchain.'
    },
    {
      question: 'Comment puis-je trouver une borne disponible ?',
      answer: 'Utilisez notre carte interactive pour visualiser en temps réel toutes les bornes disponibles près de vous. Vous pouvez filtrer par puissance, type de connecteur, prix et disponibilité. L\'application mobile offre également la navigation GPS directement vers la borne choisie.'
    },
    {
      question: 'Combien coûte une recharge avec Werenode ?',
      answer: 'Les tarifs varient selon la puissance et le type de borne, généralement entre 0.28€ et 0.55€ par kWh. Chaque propriétaire fixe son propre tarif. Il n\'y a aucun frais d\'abonnement - vous ne payez que l\'énergie consommée. Les tarifs sont affichés clairement avant chaque recharge.'
    },
    {
      question: 'Comment partager ma borne et générer des revenus ?',
      answer: 'C\'est très simple ! Inscrivez votre borne via notre formulaire, nous vérifions la compatibilité gratuitement, puis nous installons notre système de gestion intelligent. Vous fixez vos tarifs et horaires de disponibilité, et vous recevez vos revenus mensuellement. En moyenne, nos propriétaires gagnent entre 30€ et 200€ par mois selon l\'utilisation.'
    },
    {
      question: 'Ma borne est-elle compatible avec Werenode ?',
      answer: 'Notre solution est compatible avec la majorité des bornes du marché : Wallbox, Easee, Zaptec, Tesla Wall Connector, Schneider Electric, Legrand, et bien d\'autres. Les connecteurs compatibles incluent les Types 1 & 2, CCS, CHAdeMO et les prises domestiques renforcées. Contactez-nous pour vérifier la compatibilité de votre modèle spécifique.'
    },
    {
      question: 'Comment sont gérés les paiements ?',
      answer: 'Tous les paiements sont automatisés et sécurisés via notre plateforme. Les utilisateurs paient directement par carte bancaire ou wallet dans l\'application. Les propriétaires de bornes reçoivent leurs revenus mensuellement sur leur compte bancaire, après déduction de notre commission de 25% qui couvre la gestion, l\'assurance et le support.'
    }
  ];

  const renderAccueil = () => (
    <div className="min-h-screen">
      {/* Hero Section Premium */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-300">Réseau collaboratif de recharge</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Rechargez où vous voulez,
                <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  quand vous voulez
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Accédez au plus grand réseau communautaire de bornes de recharge pour véhicules électriques. 
                Simple, économique et disponible 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105">
                  Trouver une borne
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button 
                  onClick={() => setCurrentPage('partager')}
                  className="border-2 border-white/20 hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:border-white/40"
                >
                  Partager ma borne
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-blue-400">5000+</div>
                  <div className="text-sm text-slate-400">Bornes actives</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">15K+</div>
                  <div className="text-sm text-slate-400">Utilisateurs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">2M</div>
                  <div className="text-sm text-slate-400">kWh délivrés</div>
                </div>
              </div>
            </div>

            {/* Right Content - Featured Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Borne à proximité</h3>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Disponible
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-semibold">Station Lyon Confluence</div>
                      <div className="text-sm text-slate-400">15 Rue de la République • 2.1 km</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-sm text-slate-400 mb-1">Puissance</div>
                      <div className="font-bold text-blue-400">22 kW</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-sm text-slate-400 mb-1">Tarif</div>
                      <div className="font-bold text-green-400">0.35 €/kWh</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">4.8 (127 avis)</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 py-3 rounded-lg font-semibold transition-all hover:shadow-lg">
                  Réserver maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Search Bar */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <Navigation className="text-blue-600" size={22} />
                  <input 
                    type="text" 
                    placeholder="Ville, adresse ou code postal..."
                    className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
                  <MapPin size={20} />
                  Rechercher
                </button>
              </div>
              
              {/* Filter Tags */}
              <div className="flex gap-3 mt-4 flex-wrap">
                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-blue-200">
                  <Filter size={16} />
                  Disponible maintenant
                </button>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
                  Charge rapide (&gt;50kW)
                </button>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
                  Type 2
                </button>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200">
                  Prix &lt; 0.40€
                </button>
              </div>
            </div>
          </div>


          {/* Interactive Map */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 h-[500px]">
              {/* Map Overlay */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
                  <div className="text-sm font-semibold text-slate-900 mb-2">Légende</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                      <span className="text-slate-600">Disponible</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-orange-500 rounded-full shadow-lg"></div>
                      <span className="text-slate-600">Réservée</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                      <span className="text-slate-600">Occupée</span>
                    </div>
                  </div>
                </div>


          {/* Carte interactive réelle */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <CarteDesBornes />
          </div>


            
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
                  <div className="text-2xl font-bold text-blue-600">{bornes.length}</div>
                  <div className="text-xs text-slate-600">Bornes actives</div>
                </div>
              </div>

              {/* Map Pins */}
              {bornes.map((borne, index) => {
                const left = 15 + (index % 4) * 20;
                const top = 20 + Math.floor(index / 4) * 35;
                
                return (
                  <div 
                    key={borne.id}
                    onClick={() => setSelectedBorne(borne)}
                    className="absolute group cursor-pointer z-20"
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    <div className={`relative`}>
                      {/* Pin */}
                      <div className={`w-12 h-12 ${borne.disponible ? 'bg-green-500' : 'bg-red-500'} rounded-full border-4 border-white shadow-xl flex items-center justify-center hover:scale-125 transition-transform`}>
                        <Zap className="text-white" size={24} />
                      </div>

                      {/* Hover Card */}
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-white rounded-xl shadow-2xl p-4 w-72 border border-slate-200">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{borne.nom}</h4>
                              <p className="text-xs text-slate-500">{borne.adresse}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${borne.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {borne.disponible ? 'Libre' : 'Occupée'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                              <div className="text-xs text-slate-500">Puissance</div>
                              <div className="text-sm font-bold text-slate-900">{borne.puissance}</div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                              <div className="text-xs text-slate-500">Prix</div>
                              <div className="text-sm font-bold text-green-600">{borne.prix}€</div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                              <div className="text-xs text-slate-500">Distance</div>
                              <div className="text-sm font-bold text-blue-600">{borne.distance}km</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs text-slate-500 ml-1">{borne.note}</span>
                            </div>
                            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                              Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bornes List */}
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Bornes à proximité</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bornes.slice(0, 6).map((borne) => (
                  <div key={borne.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow border border-slate-100 group cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{borne.nom}</h4>
                        <p className="text-xs text-slate-500">{borne.ville} • {borne.distance} km</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${borne.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {borne.disponible ? 'Libre' : 'Occupée'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-xs text-slate-500">Puissance</div>
                        <div className="text-sm font-bold text-slate-900">{borne.puissance}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500">Type</div>
                        <div className="text-sm font-bold text-slate-900">{borne.type}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500">Prix</div>
                        <div className="text-sm font-bold text-green-600">{borne.prix}€/kWh</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-slate-500 ml-1">{borne.note} ({borne.avis})</span>
                      </div>
                      <Clock size={14} className="text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <span className="text-sm font-semibold text-blue-600">Pourquoi Werenode</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              La solution de recharge
              <span className="block text-blue-600">nouvelle génération</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une plateforme complète qui simplifie la recharge électrique pour tous
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Réseau étendu',
                description: 'Plus de 5000 bornes partagées partout en France. Trouvez toujours une borne près de vous, disponible 24/7.',
                color: 'blue'
              },
              {
                icon: Euro,
                title: 'Prix transparents',
                description: 'Tarifs clairs et compétitifs sans frais cachés. Payez uniquement l\'énergie consommée avec notre système automatisé.',
                color: 'green'
              },
              {
                icon: Shield,
                title: 'Paiements sécurisés',
                description: 'Transactions protégées par blockchain. Vos données et paiements sont chiffrés et sécurisés.',
                color: 'purple'
              },
              {
                icon: Wifi,
                title: 'Temps réel',
                description: 'Informations actualisées en direct sur la disponibilité et l\'état de chaque borne du réseau.',
                color: 'orange'
              },
              {
                icon: Clock,
                title: 'Support 24/7',
                description: 'Assistance continue avec priorité en cas d\'incident technique critique.',
                color: 'rose'
              },
              {
                icon: Users,
                title: 'Communauté',
                description: 'Un écosystème collaboratif qui rémunère les propriétaires et facilite la recharge pour tous.',
                color: 'indigo'
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl p-3 bg-${feature.color}-50 border border-${feature.color}-100`}>
                    <feature.icon className={`text-${feature.color}-600`} size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-3xl bg-black/10 backdrop-blur-md border border-white/20 p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Partagez votre borne et générez des revenus</h3>
              <p className="text-white/80">Rejoignez le réseau collaboratif Werenode et mettez votre borne à disposition en toute simplicité.</p>
            </div>
            <button onClick={() => setCurrentPage('partager')} className="px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
              Commencer
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderPartager = () => (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-green-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Partagez votre borne</h1>
          <p className="text-slate-600 text-lg max-w-3xl">Transformez votre borne en source de revenus passifs. Nous gérons la visibilité, les paiements et l'assistance.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold mb-2">Avantages</h3>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Revenus mensuels transparents</li>
                <li>Gestion et paiements automatisés</li>
                <li>Contrôle total de vos tarifs et horaires</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold mb-2">Processus</h3>
              <ol className="list-decimal pl-6 text-slate-700 space-y-2">
                <li>Inscription et vérification de compatibilité</li>
                <li>Paramétrage et publication</li>
                <li>Suivi des recharges et revenus</li>
              </ol>
            </div>
          </div>
          <form className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
              <input className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder="Votre nom" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder="vous@exemple.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                <input className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder="06 12 34 56 78" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Adresse de la borne</label>
              <input className="w-full border border-slate-300 rounded-lg px-4 py-3" placeholder="Adresse complète" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type de connecteur</label>
                <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
                  <option>Type 2</option>
                  <option>CCS</option>
                  <option>CHAdeMO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Puissance</label>
                <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
                  <option>7 kW</option>
                  <option>11 kW</option>
                  <option>22 kW</option>
                  <option>50+ kW</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Envoyer ma demande</button>
          </form>
        </div>
      </section>
    </div>
  );

  const renderFAQ = () => (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-green-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">FAQ</h1>
          <p className="text-slate-600 text-lg">Les réponses aux questions les plus fréquentes.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {faqData.map((item, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50">
                <span className="text-left font-medium text-slate-900">{item.question}</span>
                <ChevronDown className={`transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`} size={18} />
              </button>
              {openFAQ === idx && (
                <div className="px-5 py-4 bg-slate-50 text-slate-700 text-sm leading-relaxed">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Notre équipe est à votre disposition pour vous accompagner dans votre projet
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Prénom</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Sujet</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Rejoindre un collectif</option>
                      <option>Créer un collectif</option>
                      <option>Information générale</option>
                      <option>Support technique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Décrivez votre projet ou votre question..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Informations de contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="text-blue-600 mt-1 mr-4" size={20} />
                    <div>
                      <div className="font-semibold text-gray-900">Téléphone</div>
                      <div className="text-gray-600">+33 7 77 14 46 43</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-blue-600 mt-1 mr-4" size={20} />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">contact@werenode.com</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-blue-600 mt-1 mr-4" size={20} />
                    <div>
                      <div className="font-semibold text-gray-900">Adresse</div>
                      <div className="text-gray-600">
                        9 Rue Joliot-Curie<br />
                        91190 Gif-sur-Yvette, France
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2 text-blue-100">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span>9h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuiSommesNous = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Qui sommes-nous ?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Werenode accélère l'adoption des véhicules électriques grâce à un réseau collaboratif, ouvert et transparent.
            </p>
          </div>
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre mission</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Nous croyons que la mobilité doit être accessible à tous et durable.
                    Notre mission est d'accompagner les conducteurs de véhicules électriques et les personnes disposant d'un site de recharge dans la création d'un réseau efficace pour une transition énergétique inclusive et solidaire.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Grâce à notre expertise technique, nous facilitons l'accès à la mobilité propre et créons des liens durables entre les habitants.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-green-500 p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Leaf size={80} className="mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Transition Énergétique</h3>
                    <p className="text-lg opacity-90">Pour un avenir durable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expertise collective</h3>
              <p className="text-gray-600">
                Plus de 10 ans d'expérience dans la création et l'animation de collectifs énergétiques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-green-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation technique</h3>
              <p className="text-gray-600">
                Solutions technologiques avancées pour optimiser la production et la consommation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-purple-600" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact environnemental</h3>
              <p className="text-gray-600">
                Contribution concrète à la réduction des émissions de CO2 et à la préservation de l'environnement.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Solidarité</h4>
                <p className="text-gray-600">
                  L'énergie partagée pour créer du lien social et réduire les inégalités énergétiques.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Transparence</h4>
                <p className="text-gray-600">
                  Une communication claire et honnête sur nos processus et nos résultats.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Durabilité</h4>
                <p className="text-gray-600">
                  Des solutions pérennes pour un avenir énergétique respectueux de l'environnement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'accueil': return renderAccueil();
      case 'partager': return renderPartager();
      case 'faq': return renderFAQ();
      case 'contact': return renderContact();
      case 'qui-sommes-nous': return renderQuiSommesNous();
      default: return renderAccueil();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Zap size={22} className="text-blue-600" />
            <span>Werenode Charge VE</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <button key={item.key} onClick={() => setCurrentPage(item.key)} className={`text-sm font-medium hover:text-blue-600 ${currentPage === item.key ? 'text-blue-600' : 'text-slate-700'}`}>{item.label}</button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-3 flex flex-col">
              {navigation.map((item) => (
                <button key={item.key} onClick={() => { setCurrentPage(item.key); setIsMenuOpen(false); }} className={`py-2 text-left ${currentPage === item.key ? 'text-blue-600' : 'text-slate-700'}`}>{item.label}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      {renderPage()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold">Werenode Charge VE</span>
              </div>
              <p className="text-gray-400 text-sm">
                Mobilité électrique, simple et collaborative.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Collectifs d'autoconsommation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Installation solaire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accompagnement</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentPage('qui-sommes-nous')} className="hover:text-white transition-colors text-left">Qui sommes-nous</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Actualités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+33 7 77 14 46 43</li>
                <li>contact@werenode.com</li>
                <li>9 Rue Joliot-Curie<br />91190 Gif-sur-Yvette</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Werenode. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WerenodeChargeSite;







